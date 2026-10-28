/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Student, 
  Course, 
  Batch, 
  Lab, 
  Coordinator, 
  Announcement, 
  PageView, 
  LabIdentifier 
} from './types/elearning';

import { StorageService } from './services/storage';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';

import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { Footer } from './components/Footer';
import { ConfirmationModal } from './components/ConfirmationModal';

import { DashboardView } from './views/DashboardView';
import { AdminView } from './views/AdminView';
import { StudentsView } from './views/StudentsView';
import { StudentSummaryView } from './views/StudentSummaryView';
import { CoursesView } from './views/CoursesView';
import { LabsView } from './views/LabsView';
import { BatchesView } from './views/BatchesView';
import { CoordinatorsView } from './views/CoordinatorsView';
import { StudentPortalView } from './views/StudentPortalView';
import { AnnouncementsView } from './views/AnnouncementsView';
import { ProfileSettingsView } from './views/ProfileSettingsView';
import { LoginView } from './views/LoginView';

function MainApp() {
  const { currentUser, isAuthenticated, hasRole } = useAuth();
  const { t } = useLanguage();

  const [currentView, setCurrentView] = useState<PageView>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Entities state
  const [students, setStudents] = useState<Student[]>(() => StorageService.getStudents());
  const [courses, setCourses] = useState<Course[]>(() => StorageService.getCourses());
  const [batches, setBatches] = useState<Batch[]>(() => StorageService.getBatches());
  const [labs, setLabs] = useState<Lab[]>(() => StorageService.getLabs());
  const [coordinators, setCoordinators] = useState<Coordinator[]>(() => StorageService.getCoordinators());
  const [announcements, setAnnouncements] = useState<Announcement[]>(() => StorageService.getAnnouncements());

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Confirmation Modal state
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    confirmLabel?: string;
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: '',
    message: '',
    confirmLabel: undefined,
    onConfirm: () => {}
  });

  // Guard routes: if a Student is logged in and navigates to admin or student management, redirect to student portal
  useEffect(() => {
    if (currentUser?.role === 'STUDENT') {
      if (['admin', 'coordinators'].includes(currentView)) {
        setCurrentView('student_portal');
        showToast('Restricted: Students do not have permission to view administrative panels.');
      }
    }
  }, [currentView, currentUser]);

  // Student CRUD
  const handleAddStudent = (studentData: Omit<Student, 'id'> & { customId?: string }) => {
    try {
      const created = StorageService.addStudent(studentData);
      setStudents(StorageService.getStudents());
      showToast(`✓ Registered student ${created.fullName} (${created.id}) successfully!`);
    } catch (e: any) {
      showToast(`Error: ${e.message}`);
    }
  };

  const handleUpdateStudent = (updatedStudent: Student) => {
    StorageService.updateStudent(updatedStudent);
    setStudents(StorageService.getStudents());
    showToast(`✓ Updated record for ${updatedStudent.fullName} (${updatedStudent.id})`);
  };

  const handleDeleteStudentRequest = (student: Student) => {
    setDeleteConfirmation({
      isOpen: true,
      title: `Delete Student Record: ${student.fullName}?`,
      message: `Are you sure you want to permanently delete student ${student.fullName} (${student.id}) from ${student.courseName}? This action cannot be reversed.`,
      onConfirm: () => {
        StorageService.deleteStudent(student.id);
        setStudents(StorageService.getStudents());
        setDeleteConfirmation(prev => ({ ...prev, isOpen: false }));
        showToast(`✓ Removed student ${student.fullName}`);
      }
    });
  };

  // Course CRUD
  const handleAddCourse = (course: Course) => {
    try {
      StorageService.addCourse(course);
      setCourses(StorageService.getCourses());
      showToast(`✓ Added course ${course.name} (${course.id})`);
    } catch (e: any) {
      showToast(`Error: ${e.message}`);
    }
  };

  const handleUpdateCourse = (course: Course) => {
    StorageService.updateCourse(course);
    setCourses(StorageService.getCourses());
    showToast(`✓ Updated course ${course.name}`);
  };

  const handleDeleteCourseRequest = (course: Course) => {
    setDeleteConfirmation({
      isOpen: true,
      title: `Delete Course: ${course.name}?`,
      message: `Are you sure you want to permanently remove course ${course.name} (${course.id})? Students enrolled in this course will need reassignment.`,
      onConfirm: () => {
        StorageService.deleteCourse(course.id);
        setCourses(StorageService.getCourses());
        setDeleteConfirmation(prev => ({ ...prev, isOpen: false }));
        showToast(`✓ Deleted course ${course.name}`);
      }
    });
  };

  // Batch CRUD
  const handleAddBatch = (batch: Batch) => {
    try {
      StorageService.addBatch(batch);
      setBatches(StorageService.getBatches());
      showToast(`✓ Created batch ${batch.batchName}`);
    } catch (e: any) {
      showToast(`Error: ${e.message}`);
    }
  };

  const handleUpdateBatch = (batch: Batch) => {
    StorageService.updateBatch(batch);
    setBatches(StorageService.getBatches());
    showToast(`✓ Updated batch ${batch.batchName}`);
  };

  const handleDeleteBatchRequest = (batch: Batch) => {
    setDeleteConfirmation({
      isOpen: true,
      title: `Delete Batch: ${batch.batchName}?`,
      message: `Are you sure you want to delete ${batch.batchName} (${batch.id})?`,
      onConfirm: () => {
        StorageService.deleteBatch(batch.id);
        setBatches(StorageService.getBatches());
        setDeleteConfirmation(prev => ({ ...prev, isOpen: false }));
        showToast(`✓ Removed batch ${batch.batchName}`);
      }
    });
  };

  // Lab update
  const handleUpdateLab = (lab: Lab) => {
    StorageService.updateLab(lab);
    setLabs(StorageService.getLabs());
    showToast(`✓ Updated ${lab.id} (${lab.name}) configuration`);
  };

  // Coordinator CRUD
  const handleAddCoordinator = (coord: Coordinator) => {
    try {
      StorageService.addCoordinator(coord);
      setCoordinators(StorageService.getCoordinators());
      showToast(`✓ Added coordinator ${coord.fullName}`);
    } catch (e: any) {
      showToast(`Error: ${e.message}`);
    }
  };

  const handleUpdateCoordinator = (coord: Coordinator) => {
    StorageService.updateCoordinator(coord);
    setCoordinators(StorageService.getCoordinators());
    showToast(`✓ Updated coordinator ${coord.fullName}`);
  };

  const handleDeleteCoordinatorRequest = (coord: Coordinator) => {
    setDeleteConfirmation({
      isOpen: true,
      title: `Remove Coordinator: ${coord.fullName}?`,
      message: `Are you sure you want to remove coordinator ${coord.fullName} (${coord.id}) from ${coord.assignedLab}?`,
      onConfirm: () => {
        StorageService.deleteCoordinator(coord.id);
        setCoordinators(StorageService.getCoordinators());
        setDeleteConfirmation(prev => ({ ...prev, isOpen: false }));
        showToast(`✓ Removed coordinator ${coord.fullName}`);
      }
    });
  };

  // Announcement CRUD
  const handleAddAnnouncement = (ann: Announcement) => {
    StorageService.addAnnouncement(ann);
    setAnnouncements(StorageService.getAnnouncements());
    showToast(`✓ Published circular: "${ann.title}"`);
  };

  const handleDeleteAnnouncement = (id: string) => {
    StorageService.deleteAnnouncement(id);
    setAnnouncements(StorageService.getAnnouncements());
    showToast('✓ Removed announcement.');
  };

  // Export CSV
  const handleExportCSV = () => {
    StorageService.exportStudentsToCSV(students);
    showToast('✓ Exported student directory to CSV spreadsheet file.');
  };

  // Reset Data to Factory Defaults
  const handleResetData = () => {
    setDeleteConfirmation({
      isOpen: true,
      title: 'Reset Entire Database to Factory Defaults?',
      message: 'This will restore all default students, courses, batches, and four labs for Sirajganj Center. All local additions will be refreshed.',
      confirmLabel: 'Reset Database',
      onConfirm: () => {
        StorageService.resetAllData();
        setStudents(StorageService.getStudents());
        setCourses(StorageService.getCourses());
        setBatches(StorageService.getBatches());
        setLabs(StorageService.getLabs());
        setCoordinators(StorageService.getCoordinators());
        setAnnouncements(StorageService.getAnnouncements());
        setDeleteConfirmation(prev => ({ ...prev, isOpen: false }));
        showToast('✓ Restored all default Sirajganj Center records.');
      }
    });
  };

  // Navigation with Lab Filter
  const handleNavigateToStudentsWithLab = (labId: LabIdentifier) => {
    setCurrentView('students');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl text-xs font-semibold flex items-center space-x-2 border border-slate-700 animate-slide-up">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Header */}
      <Navbar
        currentView={currentView}
        onNavigate={setCurrentView}
        onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        isMobileMenuOpen={isMobileMenuOpen}
        announcementCount={announcements.length}
      />

      {/* Main Structural Layout */}
      <div className="flex-1 flex w-full">
        {/* Sidebar */}
        <Sidebar
          currentView={currentView}
          onNavigate={setCurrentView}
          isMobileOpen={isMobileMenuOpen}
          onCloseMobile={() => setIsMobileMenuOpen(false)}
        />

        {/* Content View Pane */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {currentView === 'dashboard' && (
            <DashboardView
              students={students}
              courses={courses}
              batches={batches}
              labs={labs}
              coordinators={coordinators}
              announcements={announcements}
              onNavigate={setCurrentView}
              onOpenAddStudent={() => setCurrentView('students')}
              onExportCSV={handleExportCSV}
            />
          )}

          {currentView === 'admin' && (
            <AdminView
              students={students}
              courses={courses}
              batches={batches}
              labs={labs}
              coordinators={coordinators}
              announcements={announcements}
              onNavigate={setCurrentView}
              onOpenAddStudent={() => setCurrentView('students')}
              onExportCSV={handleExportCSV}
              onResetData={handleResetData}
            />
          )}

          {currentView === 'students' && (
            <StudentsView
              students={students}
              courses={courses}
              batches={batches}
              labs={labs}
              coordinators={coordinators}
              onAddStudent={handleAddStudent}
              onUpdateStudent={handleUpdateStudent}
              onDeleteStudentRequest={handleDeleteStudentRequest}
              onExportCSV={handleExportCSV}
            />
          )}

          {currentView === 'summary' && (
            <StudentSummaryView
              students={students}
              courses={courses}
              batches={batches}
              labs={labs}
              coordinators={coordinators}
            />
          )}

          {currentView === 'courses' && (
            <CoursesView
              courses={courses}
              students={students}
              onAddCourse={handleAddCourse}
              onUpdateCourse={handleUpdateCourse}
              onDeleteCourseRequest={handleDeleteCourseRequest}
            />
          )}

          {currentView === 'batches' && (
            <BatchesView
              batches={batches}
              students={students}
              courses={courses}
              coordinators={coordinators}
              onAddBatch={handleAddBatch}
              onUpdateBatch={handleUpdateBatch}
              onDeleteBatchRequest={handleDeleteBatchRequest}
            />
          )}

          {currentView === 'labs' && (
            <LabsView
              labs={labs}
              students={students}
              courses={courses}
              batches={batches}
              onUpdateLab={handleUpdateLab}
              onNavigateToStudentsWithLabFilter={handleNavigateToStudentsWithLab}
            />
          )}

          {currentView === 'coordinators' && (
            <CoordinatorsView
              coordinators={coordinators}
              students={students}
              onAddCoordinator={handleAddCoordinator}
              onUpdateCoordinator={handleUpdateCoordinator}
              onDeleteCoordinatorRequest={handleDeleteCoordinatorRequest}
            />
          )}

          {currentView === 'student_portal' && (
            <StudentPortalView
              students={students}
              announcements={announcements}
              labs={labs}
            />
          )}

          {currentView === 'announcements' && (
            <AnnouncementsView
              announcements={announcements}
              onAddAnnouncement={handleAddAnnouncement}
              onDeleteAnnouncement={handleDeleteAnnouncement}
            />
          )}

          {currentView === 'profile_settings' && (
            <ProfileSettingsView
              onResetData={handleResetData}
            />
          )}

          {currentView === 'login' && (
            <LoginView
              onLoginSuccess={(view) => setCurrentView(view)}
            />
          )}
        </main>
      </div>

      {/* Educational Footer */}
      <Footer onNavigate={setCurrentView} />

      {/* Universal Destructive Action Confirmation Modal */}
      <ConfirmationModal
        isOpen={deleteConfirmation.isOpen}
        title={deleteConfirmation.title}
        message={deleteConfirmation.message}
        confirmLabel={deleteConfirmation.confirmLabel}
        onConfirm={deleteConfirmation.onConfirm}
        onCancel={() => setDeleteConfirmation(prev => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <MainApp />
      </AuthProvider>
    </LanguageProvider>
  );
}
