import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'bn';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<Language, string>> = {
  // Brand & Header
  orgName: {
    en: 'E-Learning and Earning',
    bn: 'ই-লার্নিং অ্যান্ড আর্নিং'
  },
  branchName: {
    en: 'Sirajganj Branch',
    bn: 'সিরাজগঞ্জ শাখা'
  },
  govSubtitle: {
    en: 'ICT Division, Government of the People’s Republic of Bangladesh',
    bn: 'তথ্য ও যোগাযোগ প্রযুক্তি বিভাগ, গণপ্রজাতন্ত্রী বাংলাদেশ সরকার'
  },
  welcomeMsg: {
    en: 'Welcome to E-learning and earning center',
    bn: 'ই-লার্নিং অ্যান্ড আর্নিং সেন্টারে স্বাগতম'
  },
  
  // Navigation
  dashboard: {
    en: 'Dashboard',
    bn: 'ড্যাশবোর্ড'
  },
  adminPanel: {
    en: 'Admin Panel',
    bn: 'অ্যাডমিন প্যানেল'
  },
  students: {
    en: 'Students Directory',
    bn: 'শিক্ষার্থী তালিকা'
  },
  summary: {
    en: 'Student Summary',
    bn: 'শিক্ষার্থী পরিসংখ্যান'
  },
  courses: {
    en: 'Courses & Training',
    bn: 'কোর্স ও প্রশিক্ষণ'
  },
  batches: {
    en: 'Batches',
    bn: 'ব্যাচ ব্যবস্থাপনা'
  },
  labs: {
    en: 'Lab Management (2 Labs)',
    bn: 'ল্যাব ব্যবস্থাপনা (২টি ল্যাব)'
  },
  coordinators: {
    en: 'Teachers & Staff',
    bn: 'শিক্ষক ও স্টাফ তালিকা'
  },
  studentPortal: {
    en: 'Student Portal',
    bn: 'শিক্ষার্থী পোর্টাল'
  },
  announcements: {
    en: 'News & Notices',
    bn: 'বিজ্ঞপ্তি ও আপডেট'
  },
  profileSettings: {
    en: 'Profile & Settings',
    bn: 'প্রোফাইল ও সেটিংস'
  },
  login: {
    en: 'Login',
    bn: 'লগইন'
  },
  logout: {
    en: 'Logout',
    bn: 'লগআউট'
  },

  // Dashboard Stats
  totalStudents: {
    en: 'Total Students',
    bn: 'মোট শিক্ষার্থী'
  },
  activeStudents: {
    en: 'Active Students',
    bn: 'সক্রিয় শিক্ষার্থী'
  },
  totalCourses: {
    en: 'Total Courses',
    bn: 'মোট কোর্স'
  },
  totalBatches: {
    en: 'Total Batches',
    bn: 'মোট ব্যাচ'
  },
  totalCoordinators: {
    en: 'Total Coordinators',
    bn: 'মোট সমন্বয়ক'
  },
  totalLabs: {
    en: 'Total Dedicated Labs',
    bn: 'মোট নির্ধারিত ল্যাব'
  },
  quickActions: {
    en: 'Quick Access',
    bn: 'দ্রুত অ্যাক্সেস'
  },
  recentRegistrations: {
    en: 'Recent Student Registrations',
    bn: 'সাম্প্রতিক শিক্ষার্থী নিবন্ধন'
  },
  latestAnnouncements: {
    en: 'Latest Announcements & Updates',
    bn: 'সর্বশেষ নোটিশ ও আপডেট'
  },
  viewAll: {
    en: 'View All',
    bn: 'সব দেখুন'
  },
  exportCSV: {
    en: 'Export to CSV / Excel',
    bn: 'সিএসভি / এক্সেলে এক্সপোর্ট'
  },
  addNewStudent: {
    en: 'Register New Student',
    bn: 'নতুন শিক্ষার্থী নিবন্ধন'
  },
  searchPlaceholder: {
    en: 'Search by ID, name, email, phone...',
    bn: 'আইডি, নাম, ইমেইল বা ফোন দিয়ে খুঁজুন...'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem('eled_srj_lang') as Language) || 'en';
  });

  const toggleLanguage = () => {
    setLanguage(prev => {
      const next = prev === 'en' ? 'bn' : 'en';
      localStorage.setItem('eled_srj_lang', next);
      return next;
    });
  };

  const t = (key: string): string => {
    if (translations[key] && translations[key][language]) {
      return translations[key][language];
    }
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
