import React, { useState } from 'react';
import { BookOpen, Users, Clock, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
interface Class {
  id: number;
  name: string;
  teacher: string;
  students: number;
  schedule: string;
  description?: string;
  year?: string;
}

interface ClassModalProps {
  class_?: Class;
  onClose: () => void;
  mode: 'view' | 'edit' | 'add';
  onSave: (classData: Partial<Class>) => void;
}



function ClassModal({ class_, onClose, mode, onSave }: ClassModalProps) {
  const [formData, setFormData] = useState<Partial<Class>>(
    class_ || {
      name: '',
      teacher: '',
      students: 0,
      schedule: '',
      description: ''
    }
  );
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            {mode === 'view' ? 'Class Details' : mode === 'edit' ? 'Edit Class' : 'Add New Class'}
          </h2>
          <button onClick={onClose} aria-label="Close">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Class Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              disabled={mode === 'view'}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Teacher
            </label>
            <input
              type="text"
              value={formData.teacher}
              onChange={(e) => setFormData({ ...formData, teacher: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              disabled={mode === 'view'}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Number of Students
              </label>
              <input
                type="number"
                value={formData.students}
                onChange={(e) => setFormData({ ...formData, students: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border rounded-lg"
                disabled={mode === 'view'}
                required
              />
            </div>

          
          </div>

          

          {mode !== 'view' && (
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
              >
                {mode === 'edit' ? 'Save Changes' : 'Add Class'}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default function Classes() {
  const [classes, setClasses] = useState<Class[]>([
    {
      id: 1,
      name: 'B.TEch IT Final year ',
      teacher: 'Mohan and vijayalashmi',
      students: 68,
      schedule: 'Mon-Fri, 8:00 AM - 2:00 PM',
      year:"IV"
    },
    {
      id: 2,
      name: 'B.Tech IT 3rd year',
      teacher: 'Gayatri D',
      students: 65,
      schedule: 'Mon-Fri, 8:00 AM - 2:00 PM',
       year:"III"
    },
    {
      id: 3,
      name: 'B.Tech IT 2nd year',
      teacher: 'Arulmozhi',
      students: 64,
      schedule: 'Mon-Fri, 9:00 AM - 3:00 PM',
       year:"II"
    },
    {
      id: 2,
      name: 'B.Tech IT 1st year',
      teacher: 'Gayatri D',
      students: 30,
      schedule: 'Mon-Fri, 8:00 AM - 2:00 PM',
       year:"I"
    }
  ]);

  const [selectedClass, setSelectedClass] = useState<Class | undefined>();
  const [modalMode, setModalMode] = useState<'view' | 'edit' | 'add' | null>(null);

  const handleSave = (classData: Partial<Class>) => {
    if (modalMode === 'edit' && selectedClass) {
      setClasses(classes.map(c => 
        c.id === selectedClass.id ? { ...c, ...classData } : c
      ));
    } else if (modalMode === 'add') {
      setClasses([...classes, { ...classData, id: Date.now() } as Class]);
    }
    setModalMode(null); // Close modal after save
  };
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Classes</h1>
        <button 
          onClick={() => {
            setSelectedClass(undefined);
            setModalMode('add');
          }}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Add New Class
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {classes.map((class_) => (
          <div key={class_.id} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-indigo-50 rounded-lg">
                <BookOpen className="h-5 w-5 text-indigo-600" />
              </div>
              <h3 className="font-semibold text-gray-900">{class_.name}</h3>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center text-gray-600">
                <Users className="h-4 w-4 mr-2" />
                <span>{class_.students} Students</span>
              </div>
             
              <p className="text-gray-600">Teacher: {class_.teacher}</p>
            </div>

            <div className="mt-4 flex space-x-3">
            <button
  onClick={() => {
    navigate('/admin/students', { state: { year: class_.year } }); // Correctly passing state with key-value
  }}
  className="flex-1 px-3 py-2 text-sm text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50"
>
  View Details
</button>

              <button
                onClick={() => {
                  setSelectedClass(class_);
                  setModalMode('edit');
                }}
                className="flex-1 px-3 py-2 text-sm text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
              >
                Edit Class
              </button>
            </div>
          </div>
        ))}
      </div>

      {modalMode && (
        <ClassModal
          class_={selectedClass}
          mode={modalMode}
          onClose={() => setModalMode(null)} // Close modal on cross button or cancel
          onSave={handleSave}
        />
      )}
    </div>
  );
}