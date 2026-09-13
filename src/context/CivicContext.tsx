import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  User,
  UserRole,
  Problem,
  ProblemStatus,
  OpenChallenge,
  CommunitySolution,
  Innovation,
  Consultation,
  ProblemLocation
} from '../types';
import {
  DEMO_USERS,
  INITIAL_PROBLEMS,
  INITIAL_CHALLENGES,
  INITIAL_SOLUTIONS,
  INITIAL_INNOVATIONS,
  INITIAL_CONSULTATIONS
} from '../data/mockData';

interface CivicContextType {
  currentUser: User;
  userRole: UserRole;
  currentRole: UserRole;
  isLoggedIn: boolean;
  switchRole: (role: UserRole) => void;
  login: (email?: string, role?: UserRole) => void;
  logout: () => void;

  // Problems
  problems: Problem[];
  getProblemById: (id: string) => Problem | undefined;
  addProblem: (problemData: {
    title: string;
    description: string;
    category: Problem['category'];
    location: ProblemLocation;
    evidencePhotos: string[];
    urgency?: Problem['urgency'];
  }) => Problem;
  updateProblemStatus: (problemId: string, newStatus: ProblemStatus, note?: string) => void;
  assignOfficer: (problemId: string, officerName: string, deadline?: string) => void;
  setProblemDeadline: (problemId: string, deadline: string) => void;
  uploadResolution: (problemId: string, photoUrl: string, notes: string) => void;
  verifyProblem: (problemId: string, feedback: 'solved' | 'still_exists', note?: string) => void;
  publishProblemAsChallenge: (problemId: string, title?: string, whyDifficult?: string) => string;

  // Challenges & Solutions
  challenges: OpenChallenge[];
  getChallengeById: (id: string) => OpenChallenge | undefined;
  solutions: CommunitySolution[];
  getSolutionsForChallenge: (challengeId: string) => CommunitySolution[];
  likeSolution: (solutionId: string) => void;
  hasUserLiked: (solutionId: string) => boolean;
  addSolution: (challengeId: string, solutionData: {
    title: string;
    idea: string;
    howItHelps: string;
    expectedImpact: string;
  }) => CommunitySolution;
  updateSolutionStatus: (solutionId: string, status: CommunitySolution['status'], reviewerNotes?: string) => void;
  reviewSolution: (solutionId: string, action: 'shortlist' | 'expert_review' | 'pilot' | 'reject', reviewerNotes?: string) => void;

  // Innovations
  innovations: Innovation[];
  addInnovation: (data: { title: string; problem: string; solution: string; expectedImpact: string }) => Innovation;
  updateInnovationStatus: (id: string, status: Innovation['status']) => void;

  // Consultations
  consultations: Consultation[];
  voteConsultation: (consultationId: string, optionKey: string) => void;
  getUserVote: (consultationId: string) => string | undefined;

  // Reset demo
  resetDemoData: () => void;

  // Global pitch statistics
  stats: {
    totalReported: number;
    totalResolved: number;
    totalInAction: number;
    totalIdeas: number;
    resolutionRate: number;
  };
}

const CivicContext = createContext<CivicContextType | undefined>(undefined);

export const CivicProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Auth state
  const [userRole, setUserRole] = useState<UserRole>(() => {
    const saved = localStorage.getItem('civic_demo_role');
    return (saved as UserRole) || 'citizen';
  });

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    const saved = localStorage.getItem('civic_demo_logged_in');
    return saved !== null ? saved === 'true' : true; // default logged in for smooth demo preview
  });

  // Problems state
  const [problems, setProblems] = useState<Problem[]>(() => {
    const saved = localStorage.getItem('civic_demo_problems');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_PROBLEMS;
  });

  // Challenges state
  const [challenges, setChallenges] = useState<OpenChallenge[]>(() => {
    const saved = localStorage.getItem('civic_demo_challenges');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_CHALLENGES;
  });

  // Solutions state
  const [solutions, setSolutions] = useState<CommunitySolution[]>(() => {
    const saved = localStorage.getItem('civic_demo_solutions');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_SOLUTIONS;
  });

  // User liked solution IDs
  const [likedSolutionIds, setLikedSolutionIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('civic_demo_liked_ids');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return ['sol-1']; // user initially liked top solution for demo
  });

  // Innovations state
  const [innovations, setInnovations] = useState<Innovation[]>(() => {
    const saved = localStorage.getItem('civic_demo_innovations');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_INNOVATIONS;
  });

  // Consultations state
  const [consultations, setConsultations] = useState<Consultation[]>(() => {
    const saved = localStorage.getItem('civic_demo_consultations');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_CONSULTATIONS;
  });

  // User votes for consultations
  const [userConsultationVotes, setUserConsultationVotes] = useState<Record<string, string>>(() => {
    const saved = localStorage.getItem('civic_demo_user_votes');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return { 'con-1': 'strongly_support' };
  });

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('civic_demo_role', userRole);
  }, [userRole]);

  useEffect(() => {
    localStorage.setItem('civic_demo_logged_in', String(isLoggedIn));
  }, [isLoggedIn]);

  useEffect(() => {
    localStorage.setItem('civic_demo_problems', JSON.stringify(problems));
  }, [problems]);

  useEffect(() => {
    localStorage.setItem('civic_demo_challenges', JSON.stringify(challenges));
  }, [challenges]);

  useEffect(() => {
    localStorage.setItem('civic_demo_solutions', JSON.stringify(solutions));
  }, [solutions]);

  useEffect(() => {
    localStorage.setItem('civic_demo_liked_ids', JSON.stringify(likedSolutionIds));
  }, [likedSolutionIds]);

  useEffect(() => {
    localStorage.setItem('civic_demo_innovations', JSON.stringify(innovations));
  }, [innovations]);

  useEffect(() => {
    localStorage.setItem('civic_demo_consultations', JSON.stringify(consultations));
  }, [consultations]);

  useEffect(() => {
    localStorage.setItem('civic_demo_user_votes', JSON.stringify(userConsultationVotes));
  }, [userConsultationVotes]);

  const currentUser = DEMO_USERS[userRole] || DEMO_USERS.citizen;

  const switchRole = (newRole: UserRole) => {
    setUserRole(newRole);
    setIsLoggedIn(true);
  };

  const login = (_email?: string, role: UserRole = 'citizen') => {
    setUserRole(role);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  const resetDemoData = () => {
    setProblems(INITIAL_PROBLEMS);
    setChallenges(INITIAL_CHALLENGES);
    setSolutions(INITIAL_SOLUTIONS);
    setInnovations(INITIAL_INNOVATIONS);
    setConsultations(INITIAL_CONSULTATIONS);
    setLikedSolutionIds(['sol-1']);
    setUserConsultationVotes({ 'con-1': 'strongly_support' });
    setUserRole('citizen');
    setIsLoggedIn(true);
    localStorage.clear();
  };

  // Problem actions
  const getProblemById = (id: string) => problems.find((p) => p.id === id);

  const addProblem = ({
    title,
    description,
    category,
    location,
    evidencePhotos,
    urgency = 'medium'
  }: {
    title: string;
    description: string;
    category: Problem['category'];
    location: ProblemLocation;
    evidencePhotos: string[];
    urgency?: Problem['urgency'];
  }): Problem => {
    // Generate demo ID
    const randomNum = 1050 + Math.floor(Math.random() * 850);
    const newId = `CB-2026-${randomNum}`;
    const departmentMap: Record<string, string> = {
      Roads: 'Public Works Department (PWD)',
      Water: 'Municipal Water & Sewerage Board',
      Garbage: 'Solid Waste Management',
      Streetlights: 'Electrical Department',
      Drainage: 'Drainage & Stormwater',
      'Public Safety': 'Traffic & Public Safety',
      Other: 'Municipal Administration'
    };

    const newProblem: Problem = {
      id: newId,
      title,
      description,
      category,
      location,
      evidencePhotos: evidencePhotos.length > 0 ? evidencePhotos : [
        'https://images.unsplash.com/photo-1584467735815-f778f274e296?auto=format&fit=crop&w=600&q=80'
      ],
      status: 'reported',
      department: departmentMap[category] || 'Public Works Department (PWD)',
      createdAt: new Date().toISOString(),
      reportedBy: currentUser.name,
      reportedByEmail: currentUser.email,
      urgency,
      timeline: [
        {
          id: `tl-${Date.now()}`,
          status: 'reported',
          timestamp: 'Just now',
          note: 'Problem reported with verified location and evidence.',
          author: currentUser.name
        }
      ]
    };

    setProblems((prev) => [newProblem, ...prev]);
    return newProblem;
  };

  const updateProblemStatus = (problemId: string, newStatus: ProblemStatus, note?: string) => {
    setProblems((prev) =>
      prev.map((prob) => {
        if (prob.id !== problemId) return prob;
        const authorDesc = `${currentUser.name} (${currentUser.roleTitle})`;
        const newTimelineEvent = {
          id: `tl-${Date.now()}`,
          status: newStatus,
          timestamp: 'Just now',
          note: note || `Status updated to ${newStatus.replace('_', ' ')}.`,
          author: authorDesc
        };
        return {
          ...prob,
          status: newStatus,
          timeline: [...prob.timeline, newTimelineEvent]
        };
      })
    );
  };

  const assignOfficer = (problemId: string, officerName: string, deadline?: string) => {
    setProblems((prev) =>
      prev.map((prob) => {
        if (prob.id !== problemId) return prob;
        const newTimelineEvent = {
          id: `tl-${Date.now()}`,
          status: 'assigned' as ProblemStatus,
          timestamp: 'Just now',
          note: `Assigned to ${officerName}${deadline ? ` with deadline: ${deadline}` : ''}.`,
          author: `${currentUser.name} (Dept Admin)`
        };
        return {
          ...prob,
          status: 'assigned',
          assignedOfficer: officerName,
          deadline: deadline || prob.deadline || 'Within 48 hours',
          timeline: [...prob.timeline, newTimelineEvent]
        };
      })
    );
  };

  const setProblemDeadline = (problemId: string, deadline: string) => {
    setProblems((prev) =>
      prev.map((prob) => (prob.id === problemId ? { ...prob, deadline } : prob))
    );
  };

  const uploadResolution = (problemId: string, photoUrl: string, notes: string) => {
    setProblems((prev) =>
      prev.map((prob) => {
        if (prob.id !== problemId) return prob;
        const newTimelineEvent = {
          id: `tl-${Date.now()}`,
          status: 'resolution_pending' as ProblemStatus,
          timestamp: 'Just now',
          note: `Field resolution completed: ${notes}`,
          author: `${currentUser.name} (Field Officer)`,
          photoUrl
        };
        return {
          ...prob,
          status: 'resolution_pending',
          resolutionPhoto: photoUrl,
          resolutionNotes: notes,
          timeline: [...prob.timeline, newTimelineEvent]
        };
      })
    );
  };

  const verifyProblem = (problemId: string, feedback: 'solved' | 'still_exists', note?: string) => {
    setProblems((prev) =>
      prev.map((prob) => {
        if (prob.id !== problemId) return prob;
        const isSolved = feedback === 'solved';
        const newStatus: ProblemStatus = isSolved ? 'resolved' : 'reopened';
        const newTimelineEvent = {
          id: `tl-${Date.now()}`,
          status: newStatus,
          timestamp: 'Just now',
          note: isSolved
            ? `Citizen confirmed resolution: ${note || 'Issue verified solved on ground.'}`
            : `Citizen reported problem still exists: ${note || 'Work incomplete, reopened.'}`,
          author: `${currentUser.name} (Citizen)`
        };
        return {
          ...prob,
          status: newStatus,
          citizenFeedback: feedback,
          citizenFeedbackNote: note,
          timeline: [...prob.timeline, newTimelineEvent]
        };
      })
    );
  };

  const publishProblemAsChallenge = (problemId: string, customTitle?: string, customWhyDifficult?: string): string => {
    const prob = problems.find((p) => p.id === problemId);
    if (!prob) return '';

    const newChallengeId = `chal-${Date.now()}`;
    const newChallenge: OpenChallenge = {
      id: newChallengeId,
      title: customTitle || `How can we solve recurring issue: ${prob.title}?`,
      problemDescription: prob.description,
      whyDifficult: customWhyDifficult || `Conventional methods faced engineering constraints and utility clashes at ${prob.location.address}. The city is seeking community ideas.`,
      location: prob.location.address,
      department: prob.department,
      status: 'open',
      solutionsCount: 0,
      linkedProblemId: prob.id,
      createdAt: new Date().toISOString()
    };

    setChallenges((prev) => [newChallenge, ...prev]);

    // Update problem as published to challenge
    setProblems((prev) =>
      prev.map((p) => {
        if (p.id !== problemId) return p;
        return {
          ...p,
          publishedToChallenge: true,
          timeline: [
            ...p.timeline,
            {
              id: `tl-${Date.now()}`,
              status: p.status,
              timestamp: 'Just now',
              note: `Government published this unsolved problem as an Open Civic Challenge for citizen co-creation.`,
              author: `${currentUser.name} (Dept Admin)`
            }
          ]
        };
      })
    );

    return newChallengeId;
  };

  // Challenges & Solutions
  const getChallengeById = (id: string) => challenges.find((c) => c.id === id);

  const getSolutionsForChallenge = (challengeId: string) => {
    return solutions
      .filter((s) => s.challengeId === challengeId)
      .sort((a, b) => b.likes - a.likes); // Highest likes MUST appear first!
  };

  const hasUserLiked = (solutionId: string) => likedSolutionIds.includes(solutionId);

  const likeSolution = (solutionId: string) => {
    const isLiked = likedSolutionIds.includes(solutionId);

    if (isLiked) {
      // Unlike
      setLikedSolutionIds((prev) => prev.filter((id) => id !== solutionId));
      setSolutions((prev) =>
        prev.map((s) => (s.id === solutionId ? { ...s, likes: Math.max(0, s.likes - 1) } : s))
      );
    } else {
      // Like
      setLikedSolutionIds((prev) => [...prev, solutionId]);
      setSolutions((prev) =>
        prev.map((s) => (s.id === solutionId ? { ...s, likes: s.likes + 1 } : s))
      );
    }
  };

  const addSolution = (
    challengeId: string,
    {
      title,
      idea,
      howItHelps,
      expectedImpact
    }: {
      title: string;
      idea: string;
      howItHelps: string;
      expectedImpact: string;
    }
  ): CommunitySolution => {
    const newSolution: CommunitySolution = {
      id: `sol-${Date.now()}`,
      challengeId,
      title,
      idea,
      howItHelps,
      expectedImpact,
      author: currentUser.name,
      authorRole: currentUser.roleTitle,
      likes: 1, // Start with submitter's like
      status: 'submitted',
      createdAt: new Date().toISOString()
    };

    setSolutions((prev) => [newSolution, ...prev]);
    setLikedSolutionIds((prev) => [...prev, newSolution.id]);

    // Update challenge solutions count
    setChallenges((prev) =>
      prev.map((c) => (c.id === challengeId ? { ...c, solutionsCount: c.solutionsCount + 1 } : c))
    );

    return newSolution;
  };

  const updateSolutionStatus = (
    solutionId: string,
    status: CommunitySolution['status'],
    reviewerNotes?: string
  ) => {
    setSolutions((prev) =>
      prev.map((s) =>
        s.id === solutionId
          ? {
              ...s,
              status,
              reviewerNotes: reviewerNotes || s.reviewerNotes
            }
          : s
      )
    );
  };

  const reviewSolution = (
    solutionId: string,
    action: 'shortlist' | 'expert_review' | 'pilot' | 'reject',
    reviewerNotes?: string
  ) => {
    const statusMap: Record<'shortlist' | 'expert_review' | 'pilot' | 'reject', CommunitySolution['status']> = {
      shortlist: 'shortlisted',
      expert_review: 'expert_review',
      pilot: 'pilot',
      reject: 'rejected'
    };
    updateSolutionStatus(solutionId, statusMap[action], reviewerNotes);
  };

  // Innovations
  const addInnovation = ({
    title,
    problem,
    solution,
    expectedImpact
  }: {
    title: string;
    problem: string;
    solution: string;
    expectedImpact: string;
  }): Innovation => {
    const newInnovation: Innovation = {
      id: `inn-${Date.now()}`,
      title,
      problem,
      solution,
      expectedImpact,
      author: currentUser.name,
      status: 'under_review',
      createdAt: new Date().toISOString()
    };
    setInnovations((prev) => [newInnovation, ...prev]);
    return newInnovation;
  };

  const updateInnovationStatus = (id: string, status: Innovation['status']) => {
    setInnovations((prev) =>
      prev.map((inn) => (inn.id === id ? { ...inn, status } : inn))
    );
  };

  // Consultations
  const voteConsultation = (consultationId: string, optionKey: string) => {
    setUserConsultationVotes((prev) => ({ ...prev, [consultationId]: optionKey }));

    setConsultations((prev) =>
      prev.map((con) => {
        if (con.id !== consultationId) return con;
        const prevVote = userConsultationVotes[consultationId];
        const newOptions = con.options.map((opt) => {
          if (opt.key === optionKey) {
            return { ...opt, votes: opt.votes + 1 };
          }
          if (prevVote && opt.key === prevVote) {
            return { ...opt, votes: Math.max(0, opt.votes - 1) };
          }
          return opt;
        });
        return {
          ...con,
          options: newOptions,
          totalVotes: prevVote ? con.totalVotes : con.totalVotes + 1
        };
      })
    );
  };

  const getUserVote = (consultationId: string) => userConsultationVotes[consultationId];

  // Stats calculation
  const totalReported = 1284 + (problems.length - INITIAL_PROBLEMS.length);
  const totalResolved = 1042 + problems.filter((p) => p.status === 'resolved' && !INITIAL_PROBLEMS.some(ip => ip.id === p.id && ip.status === 'resolved')).length;
  const totalInAction = problems.filter((p) => p.status === 'assigned' || p.status === 'in_progress' || p.status === 'resolution_pending').length;
  const totalIdeas = 127 + (solutions.length - INITIAL_SOLUTIONS.length) + (innovations.length - INITIAL_INNOVATIONS.length);
  const resolutionRate = Math.round((totalResolved / totalReported) * 100);

  return (
    <CivicContext.Provider
      value={{
        currentUser,
        userRole,
        currentRole: userRole,
        isLoggedIn,
        switchRole,
        login,
        logout,
        problems,
        getProblemById,
        addProblem,
        updateProblemStatus,
        assignOfficer,
        setProblemDeadline,
        uploadResolution,
        verifyProblem,
        publishProblemAsChallenge,
        challenges,
        getChallengeById,
        solutions,
        getSolutionsForChallenge,
        likeSolution,
        hasUserLiked,
        addSolution,
        updateSolutionStatus,
        reviewSolution,
        innovations,
        addInnovation,
        updateInnovationStatus,
        consultations,
        voteConsultation,
        getUserVote,
        resetDemoData,
        stats: {
          totalReported,
          totalResolved,
          totalInAction,
          totalIdeas,
          resolutionRate
        }
      }}
    >
      {children}
    </CivicContext.Provider>
  );
};

export const useCivic = (): CivicContextType => {
  const context = useContext(CivicContext);
  if (!context) {
    throw new Error('useCivic must be used within a CivicProvider');
  }
  return context;
};
