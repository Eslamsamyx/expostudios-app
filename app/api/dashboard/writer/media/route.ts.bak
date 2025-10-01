import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { writeFile, mkdir, unlink } from "fs/promises";
import { join } from "path";
import { v4 as uuidv4 } from "uuid";
import { getImageDimensions } from "@/lib/image-utils";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !['ADMIN', 'WRITER'].includes(session.user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch media files from database
    const mediaFiles = await prisma.media.findMany({
      include: {
        uploader: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Transform for frontend compatibility
    const transformedFiles = mediaFiles.map(file => ({
      id: file.id,
      filename: file.originalName,
      url: `/api/media/${file.filename}`,
      publicUrl: file.publicUrl || `/api/media/${file.filename}`,
      size: file.size,
      mimeType: file.mimeType,
      width: file.width,
      height: file.height,
      uploadedAt: file.createdAt.toISOString(),
      uploadedBy: {
        name: file.uploader.name,
        email: file.uploader.email,
      },
    }));

    return NextResponse.json(transformedFiles);
  } catch (error) {
    console.error("Error fetching media files:", error);
    return NextResponse.json(
      { error: "Failed to fetch media files" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !['ADMIN', 'WRITER'].includes(session.user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const files = formData.getAll('files') as File[];

    if (!files.length) {
      return NextResponse.json(
        { error: "No files provided" },
        { status: 400 }
      );
    }

    // Validate files
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
      'image/svg+xml',
      'video/mp4',
      'video/webm',
      'video/quicktime',
      'audio/mp3',
      'audio/mpeg',
      'audio/wav',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain',
      'text/csv',
    ];

    for (const file of files) {
      if (file.size > maxSize) {
        return NextResponse.json(
          { error: `File ${file.name} is too large. Maximum size is 10MB.` },
          { status: 400 }
        );
      }

      if (!allowedTypes.includes(file.type)) {
        return NextResponse.json(
          { error: `File type ${file.type} is not allowed.` },
          { status: 400 }
        );
      }
    }

    // Create uploads directory if it doesn't exist
    const uploadsDir = join(process.cwd(), 'public', 'uploads');
    try {
      await mkdir(uploadsDir, { recursive: true });
    } catch (error) {
      // Directory already exists
    }

    const uploadedFiles = [];

    for (const file of files) {
      // Generate unique filename
      const fileExtension = file.name.split('.').pop();
      const uniqueFilename = `${uuidv4()}.${fileExtension}`;
      const filePath = join(uploadsDir, uniqueFilename);

      // Save file
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      await writeFile(filePath, buffer);

      // Get image dimensions if it's an image
      let width = null;
      let height = null;
      if (file.type.startsWith('image/')) {
        try {
          const dimensions = await getImageDimensions(buffer);
          width = dimensions.width;
          height = dimensions.height;
        } catch (error) {
          console.log('Could not get image dimensions:', error);
        }
      }

      // Save to database
      const mediaRecord = await prisma.media.create({
        data: {
          filename: uniqueFilename,
          originalName: file.name,
          url: `/uploads/${uniqueFilename}`,
          publicUrl: `/api/media/${uniqueFilename}`,
          size: file.size,
          mimeType: file.type,
          width,
          height,
          uploadedBy: session.user.id,
        },
        include: {
          uploader: {
            select: {
              name: true,
              email: true,
            },
          },
        },
      });

      // Transform for response
      const mediaFile = {
        id: mediaRecord.id,
        filename: mediaRecord.originalName,
        url: `/api/media/${mediaRecord.filename}`,
        publicUrl: mediaRecord.publicUrl,
        size: mediaRecord.size,
        mimeType: mediaRecord.mimeType,
        width: mediaRecord.width,
        height: mediaRecord.height,
        uploadedAt: mediaRecord.createdAt.toISOString(),
        uploadedBy: {
          name: mediaRecord.uploader.name,
          email: mediaRecord.uploader.email,
        },
      };

      uploadedFiles.push(mediaFile);
    }

    // Log the activity
    await prisma.activityLog.create({
      data: {
        userId: session.user.id,
        action: 'UPLOAD',
        entity: 'Media',
        details: {
          fileCount: uploadedFiles.length,
          files: uploadedFiles.map(f => f.filename),
        },
      },
    });

    return NextResponse.json(uploadedFiles, { status: 201 });
  } catch (error) {
    console.error("Error uploading files:", error);
    return NextResponse.json(
      { error: "Failed to upload files" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !['ADMIN', 'WRITER'].includes(session.user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { fileIds } = body;

    if (!Array.isArray(fileIds) || fileIds.length === 0) {
      return NextResponse.json(
        { error: "No file IDs provided" },
        { status: 400 }
      );
    }

    // Fetch the file records from the database
    const mediaFiles = await prisma.media.findMany({
      where: {
        id: {
          in: fileIds,
        },
      },
    });

    if (mediaFiles.length === 0) {
      return NextResponse.json(
        { error: "No files found" },
        { status: 404 }
      );
    }

    // Check permissions - only allow users to delete their own files unless admin
    if (session.user.role !== 'ADMIN') {
      const unauthorizedFiles = mediaFiles.filter(
        file => file.uploadedBy !== session.user.id
      );
      if (unauthorizedFiles.length > 0) {
        return NextResponse.json(
          { error: "You can only delete your own files" },
          { status: 403 }
        );
      }
    }

    const uploadsDir = join(process.cwd(), 'public', 'uploads');
    const deletedFiles = [];

    // Delete physical files and database records
    for (const mediaFile of mediaFiles) {
      try {
        // Delete physical file
        const filePath = join(uploadsDir, mediaFile.filename);
        await unlink(filePath);

        // Delete database record
        await prisma.media.delete({
          where: { id: mediaFile.id },
        });

        deletedFiles.push(mediaFile.originalName);
      } catch (error) {
        console.error(`Error deleting file ${mediaFile.filename}:`, error);
        // Continue with other files even if one fails
      }
    }

    // Log the activity
    await prisma.activityLog.create({
      data: {
        userId: session.user.id,
        action: 'DELETE',
        entity: 'Media',
        details: {
          fileIds,
          fileCount: deletedFiles.length,
          deletedFiles,
        },
      },
    });

    return NextResponse.json({
      message: `Successfully deleted ${deletedFiles.length} file(s)`,
      deletedFiles,
    });
  } catch (error) {
    console.error("Error deleting files:", error);
    return NextResponse.json(
      { error: "Failed to delete files" },
      { status: 500 }
    );
  }
}