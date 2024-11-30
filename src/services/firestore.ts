import { 
  collection, 
  addDoc, 
  updateDoc, 
  getDocs,
  query,
  where,
  setDoc,
  doc,
  deleteDoc
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../config/firebase';
import { User, Notice, Class, Attachment } from '../types';

// Function to delete demo students
export const deleteDemoStudents = async () => {
  try {
    const studentNames = ['John Doe', 'Alice Smith'];
    for (const name of studentNames) {
      const docRef = doc(db, 'students', name);  // Using student name as document ID
      await deleteDoc(docRef);
    }
    console.log('Demo students deleted successfully');
  } catch (error) {
    console.error('Error deleting demo students:', error);
  }
};

// Initialize demo data
export const initializeDemoData = async () => {
  try {
    // Delete demo students if they exist
    await deleteDemoStudents();

    // Add demo students
    const students = [
      {
        name: 'John Doe',
        email: 'john@student.com',
        registerNumber: 'REG2024001',
        class: '10A',
        role: 'student',
        password: 'student123',
        profilePhoto: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop'
      },
      {
        name: 'Alice Smith',
        email: 'alice@student.com',
        registerNumber: 'REG2024002',
        class: '10B',
        role: 'student',
        password: 'student123',
        profilePhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop'
      }
    ];

    // Add demo classes
    const classes = [
      {
        id: 'class1',
        name: 'Class 10A',
        teacher: 'Dr. Smith',
        students: 32,
        schedule: 'Mon-Fri, 8:00 AM - 2:00 PM',
        description: 'Science Stream'
      },
      {
        id: 'class2',
        name: 'Class 10B',
        teacher: 'Mrs. Johnson',
        students: 30,
        schedule: 'Mon-Fri, 8:00 AM - 2:00 PM',
        description: 'Commerce Stream'
      }
    ];

    // Add demo admin
    const admin = {
      id: 'admin1',
      name: 'Admin User',
      email: 'admin@gmail.com',
      role: 'admin',
      password: 'admin123'
    };

    // Add students to Firestore
    for (const student of students) {
      await setDoc(doc(db, 'students', student.name), student);  // Using student name as document ID
    }

    // Add classes to Firestore
    for (const class_ of classes) {
      await setDoc(doc(db, 'classes', class_.id), class_);
    }

    // Add admin to Firestore
    await setDoc(doc(db, 'admins', admin.id), admin);

    console.log('Demo data initialized successfully');
  } catch (error) {
    console.error('Error initializing demo data:', error);
  }
};

// Student Services
export const getStudentByRegisterNumber = async (registerNumber: string) => {
  try {
    const q = query(
      collection(db, 'students'), 
      where('email', '==', registerNumber)
    );
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const studentDoc = querySnapshot.docs[0];
      console.log({ id: studentDoc.id, ...studentDoc.data() })
      return { id: studentDoc.id, ...studentDoc.data() } as User;
    }
    return null;
  } catch (error) {
    console.error('Error getting student:', error);
    return null;
  }
};

// Admin Authentication
export const validateAdminCredentials = async (email: string, password: string) => {
  try {
    const q = query(
      collection(db, 'admins'), 
      where('email', '==', email)
    );
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const adminDoc = querySnapshot.docs[0];
      const admin = adminDoc.data();
      
      if (admin.password === password) {
        return { id: adminDoc.id, ...admin } as User;
      }
    }
    return null;
  } catch (error) {
    console.error('Error validating admin:', error);
    return null;
  }
};

// Student Management
export const addStudent = async (student: Omit<User, 'id'>) => {
  try {
    const docRef = doc(db, 'students', student.name);  // Using student's name as ID
    await setDoc(docRef, { ...student, id: student.name });
    
    return { id: student.name, ...student };
  } catch (error) {
    console.error('Error adding student:', error);
    throw new Error('Failed to add student');
  }
};

export const updateStudent = async (id: string, data: Partial<User>) => {
  try {
    const docRef = doc(db, 'students', id);
    await updateDoc(docRef, data);
  } catch (error) {
    console.error('Error updating student:', error);
    throw new Error('Failed to update student');
  }
};

export const deleteStudent = async (id: string) => {
  try {
    const docRef = doc(db, 'students', id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting student:', error);
    throw new Error('Failed to delete student');
  }
};

export const getStudents = async (year: string) => {
  try {
    // Use a query to fetch only documents with 'year' matching the argument
    const q = query(
      collection(db, 'students'),
      where('year', '==', year) // Filter for year field dynamically
    );
    const querySnapshot = await getDocs(q);
    
    // Ensure each document is typed as User and exclude specific names
    return querySnapshot.docs
      .map(doc => ({ id: doc.id, ...(doc.data() as User) }))
      .filter(student => student.name !== 'John Doe' && student.name !== 'Alice Smith');
  } catch (error) {
    console.error('Error getting students:', error);
    return [];
  }
};

export const getStudentsAll = async () => {
  try {
    // Use a query to fetch only documents with 'year' matching the argument
    const q = query(
      collection(db, 'students')
       // Filter for year field dynamically
    );
    const querySnapshot = await getDocs(q);
    
    // Ensure each document is typed as User and exclude specific names
    return querySnapshot.docs
      .map(doc => ({ id: doc.id, ...(doc.data() as User) }))
      .filter(student => student.name !== 'John Doe' && student.name !== 'Alice Smith');
  } catch (error) {
    console.error('Error getting students:', error);
    return [];
  }
};



// Class Management
export const addClass = async (classData: Omit<Class, 'id'>) => {
  try {
    const docRef = await addDoc(collection(db, 'classes'), classData);
    return { id: docRef.id, ...classData };
  } catch (error) {
    console.error('Error adding class:', error);
    throw new Error('Failed to add class');
  }
};

export const updateClass = async (id: string, data: Partial<Class>) => {
  try {
    const docRef = doc(db, 'classes', id);
    await updateDoc(docRef, data);
  } catch (error) {
    console.error('Error updating class:', error);
    throw new Error('Failed to update class');
  }
};

export const deleteClass = async (id: string) => {
  try {
    const docRef = doc(db, 'classes', id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting class:', error);
    throw new Error('Failed to delete class');
  }
};

export const getClasses = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'classes'));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Class[];
  } catch (error) {
    console.error('Error getting classes:', error);
    return [];
  }
};

// Notice Services
export const addNotice = async (notice: Omit<Notice, 'id'>, files: File[]) => {
  const attachments: Attachment[] = [];
  
  try {
    for (const file of files) {
      const storageRef = ref(storage, `notices/${Date.now()}_${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const url = await getDownloadURL(snapshot.ref);
      
      attachments.push({
        id: Date.now().toString(),
        name: file.name,
        url,
        type: file.type,
        path: snapshot.ref.fullPath
      });
    }

    const noticeWithAttachments = { ...notice, attachments };
    const docRef = await addDoc(collection(db, 'notices'), noticeWithAttachments);
    return { id: docRef.id, ...noticeWithAttachments };
  } catch (error) {
    console.error('Error adding notice:', error);
    throw new Error('Failed to add notice');
  }
};

export const getNotices = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'notices'));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Notice[];
  } catch (error) {
    console.error('Error getting notices:', error);
    return [];
  }
};
