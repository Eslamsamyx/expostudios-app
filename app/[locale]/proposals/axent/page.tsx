import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PasswordGate from '@/components/proposals/PasswordGate';
import ProposalHero from '@/components/proposals/axent/ProposalHero';
import ExecutiveSummary from '@/components/proposals/axent/ExecutiveSummary';
import TableOfContents from '@/components/proposals/axent/TableOfContents';
import ContextObjectives from '@/components/proposals/axent/ContextObjectives';
import ScopeOfWork from '@/components/proposals/axent/ScopeOfWork';
import OptionA from '@/components/proposals/axent/OptionA';
import OptionB from '@/components/proposals/axent/OptionB';
import Comparison from '@/components/proposals/axent/Comparison';
import OnboardingPlan from '@/components/proposals/axent/OnboardingPlan';
import ProjectManagement from '@/components/proposals/axent/ProjectManagement';
import QualitySecurity from '@/components/proposals/axent/QualitySecurity';
import Commercials from '@/components/proposals/axent/Commercials';
import RisksMitigations from '@/components/proposals/axent/RisksMitigations';
import AcceptanceCriteria from '@/components/proposals/axent/AcceptanceCriteria';
import Governance from '@/components/proposals/axent/Governance';

export const metadata: Metadata = {
  title: 'Axent Proposal - Dedicated Team & DaaS | ExpoStudios',
  description: 'Comprehensive design partnership proposal for Axent: Dedicated Team and Design-as-a-Service options',
};

export default function AxentProposalPage() {
  return (
    <PasswordGate
      password="AXENT2025"
      title="Axent Proposal"
      subtitle="This proposal is password protected. Please enter the password to continue."
    >
      <div className="min-h-screen">
        <Header />

      {/* Hero - slate-950 to blue-950 */}
      <div className="bg-gradient-to-b from-slate-950 to-blue-950">
        <ProposalHero />
      </div>

      {/* Executive Summary - blue-950 to indigo-950 */}
      <div className="bg-gradient-to-b from-blue-950 to-indigo-950">
        <ExecutiveSummary />
      </div>

      {/* Table of Contents - indigo-950 to purple-950 */}
      <div className="bg-gradient-to-b from-indigo-950 to-purple-950">
        <TableOfContents />
      </div>

      {/* Context & Objectives - purple-950 to violet-950 */}
      <div className="bg-gradient-to-b from-purple-950 to-violet-950">
        <ContextObjectives />
      </div>

      {/* Scope of Work - violet-950 to blue-950 */}
      <div className="bg-gradient-to-b from-violet-950 to-blue-950">
        <ScopeOfWork />
      </div>

      {/* Option A - blue-950 to indigo-950 */}
      <div className="bg-gradient-to-b from-blue-950 to-indigo-950">
        <OptionA />
      </div>

      {/* Option B - indigo-950 to purple-950 */}
      <div className="bg-gradient-to-b from-indigo-950 to-purple-950">
        <OptionB />
      </div>

      {/* Comparison - purple-950 to violet-950 */}
      <div className="bg-gradient-to-b from-purple-950 to-violet-950">
        <Comparison />
      </div>

      {/* Onboarding Plan - violet-950 to indigo-950 */}
      <div className="bg-gradient-to-b from-violet-950 to-indigo-950">
        <OnboardingPlan />
      </div>

      {/* Project Management - indigo-950 to purple-950 */}
      <div className="bg-gradient-to-b from-indigo-950 to-purple-950">
        <ProjectManagement />
      </div>

      {/* Quality & Security - purple-950 to violet-950 */}
      <div className="bg-gradient-to-b from-purple-950 to-violet-950">
        <QualitySecurity />
      </div>

      {/* Commercials - violet-950 to slate-900 */}
      <div className="bg-gradient-to-b from-violet-950 to-slate-900">
        <Commercials />
      </div>

      {/* Risks & Mitigations - slate-900 to slate-950 */}
      <div className="bg-gradient-to-b from-slate-900 to-slate-950">
        <RisksMitigations />
      </div>

      {/* Acceptance Criteria - slate-950 to slate-900 */}
      <div className="bg-gradient-to-b from-slate-950 to-slate-900">
        <AcceptanceCriteria />
      </div>

      {/* Governance - slate-900 to slate-950 */}
      <div className="bg-gradient-to-b from-slate-900 to-slate-950">
        <Governance />
      </div>

        <Footer />
      </div>
    </PasswordGate>
  );
}
