import React, { useState, useEffect } from 'react';
import { User, Mail, BookOpen, Search, X, Upload, Camera } from 'lucide-react';
import { getStudents, addStudent, updateStudent } from '../../services/firestore';
import { User as UserType } from '../../types';
import { useLocation } from 'react-router-dom';

interface ExtendedUser extends UserType {
  mobileNumber?: string;
  dateOfBirth?: string;
  gender?: string;
  fatherName?: string;
  motherName?: string;
  motherOccupation?: string;
  fatherOccupation?: string;
  address?: string;
  bloodGroup?: string;
  age?: string;
  adhaarNumber?: string;
  tenthMark?: string;
  twelfthMark?: string;
  ugCgpa?: string;
  annualIncome?: string;
}

interface StudentModalProps {
  student: ExtendedUser | null;
  onClose: () => void;
  mode: 'view' | 'edit' | 'add';
  onSave: (student: Partial<ExtendedUser>) => void;
}

function StudentModal({ student, onClose, mode, onSave }: StudentModalProps) {
  const [editedStudent, setEditedStudent] = useState<Partial<ExtendedUser>>(
    student || {
      name: '',
      email: '',
      registerNumber: '',
      class: '',
      role: 'student',
      profilePhoto: '',
      mobileNumber: '',
      dateOfBirth: '',
      gender: '',
      fatherName: '',
      motherName: '',
      motherOccupation: '',
      fatherOccupation: '',
      address: '',
      bloodGroup: '',
      age: '',
      adhaarNumber: '',
      tenthMark: '',
      twelfthMark: '',
      ugCgpa: '',
      annualIncome: '',
    }
  );
  const [newPhoto, setNewPhoto] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      await onSave({ ...editedStudent, profilePhoto: newPhoto || editedStudent.profilePhoto });
      onClose();
    } catch (error) {
      console.error('Error saving student:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            {mode === 'view' ? 'Student Details' : mode === 'edit' ? 'Edit Student' : 'Add New Student'}
          </h2>
          <button onClick={onClose}>
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <img
                src={newPhoto || editedStudent.profilePhoto || 'https://via.placeholder.com/150'}
                alt={editedStudent.name}
                className="w-24 h-24 rounded-full object-cover"
              />
              {mode !== 'view' && (
                <label className="absolute bottom-0 right-0 p-1 bg-indigo-600 rounded-full cursor-pointer">
                  <Camera className="h-4 w-4 text-white" />
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handlePhotoChange}
                  />
                </label>
              )}
            </div>
          </div>

          <div className="grid gap-6">
            {[
              { label: 'Full Name', value: 'name', type: 'text' },
              { label: 'Register Number', value: 'registerNumber', type: 'text' },
              { label: 'Email', value: 'email', type: 'email' },
              { label: 'Class', value: 'class', type: 'text' },
              { label: 'Mobile Number', value: 'mobileNumber', type: 'tel' },
              { label: 'Date of Birth', value: 'dateOfBirth', type: 'date' },
              { label: 'Gender', value: 'gender', type: 'text' },
              { label: 'Father\'s Name', value: 'fatherName', type: 'text' },
              { label: 'Mother\'s Name', value: 'motherName', type: 'text' },
              { label: 'Father\'s Occupation', value: 'fatherOccupation', type: 'text' },
              { label: 'Mother\'s Occupation', value: 'motherOccupation', type: 'text' },
              { label: 'Address', value: 'address', type: 'text' },
              { label: 'Blood Group', value: 'bloodGroup', type: 'text' },
              { label: 'Age', value: 'age', type: 'number' },
              { label: 'Adhaar Number', value: 'adhaarNumber', type: 'text' },
              { label: '10th Mark', value: 'tenthMark', type: 'number' },
              { label: '12th Mark', value: 'twelfthMark', type: 'number' },
              { label: 'UG CGPA', value: 'ugCgpa', type: 'number' },
              { label: 'Annual Income', value: 'annualIncome', type: 'number' },
            ].map(({ label, value, type }) => (
              <div key={value}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                <input
                  type={type}
                  value={editedStudent[value as keyof ExtendedUser] || ''}
                  onChange={(e) => setEditedStudent({ ...editedStudent, [value]: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  disabled={mode === 'view'}
                  required
                />
              </div>
            ))}
          </div>

          {mode !== 'view' && (
            <div className="flex justify-end space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-lg"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? 'Saving...' : mode === 'edit' ? 'Save Changes' : 'Add Student'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Students() {
  const [students, setStudents] = useState<UserType[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<UserType | null>(null);
  const [modalMode, setModalMode] = useState<'view' | 'edit' | 'add' | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const { year } = location.state || {}; 
  console.log(year)
  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      const fetchedStudents = await getStudents(year);
      setStudents(fetchedStudents);
    } catch (error) {
      console.error('Error loading students:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveStudent = async (studentData: Partial<ExtendedUser>) => {
    try {
      if (modalMode === 'edit' && selectedStudent) {
        await updateStudent(selectedStudent.id, studentData);
      } else if (modalMode === 'add') {
        await addStudent(studentData as Omit<ExtendedUser, 'id'>);
      }
      await loadStudents();
    } catch (error) {
      console.error('Error saving student:', error);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => {
              setModalMode('add');
              setSelectedStudent(null);
            }}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
          >
            Add Student
          </button>
          <div className="flex items-center space-x-2 border border-gray-300 rounded-lg px-3 py-1">
            <Search className="h-5 w-5 text-gray-600" />
            <input
              type="text"
              placeholder="Search by name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="outline-none"
            />
          </div>
        </div>
      </div>

      <div className="p-4">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div className="space-y-4">
            {students
              .filter((student) =>
                student.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((student) => (
                <div
                  key={student.id}
                  className="flex justify-between items-center p-4 border rounded-lg shadow-md"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={student.profilePhoto || 'https://via.placeholder.com/150'}
                      alt={student.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="text-lg font-semibold">{student.name}</h3>
                      <p className="text-sm text-gray-500">{student.email}</p>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => {
                        setModalMode('view');
                        setSelectedStudent(student);
                      }}
                      className="text-indigo-600"
                    >
                      View
                    </button>
                    <button
                      onClick={() => {
                        setModalMode('edit');
                        setSelectedStudent(student);
                      }}
                      className="text-blue-600"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>

      {modalMode && (
        <StudentModal
          student={selectedStudent}
          onClose={() => setModalMode(null)}
          mode={modalMode}
          onSave={handleSaveStudent}
        />
      )}
    </div>
  );
}
