export interface Student {
  // 📍 Personal Details
  _id?: string;
  name: string;
  gender: string;
  dob?: Date;
  photo?: string;
  aadhaarNumber?: string;

  // 🧑‍🤝‍🧑 Parent Details
  fatherName: string;
  motherName?: string;

  // 📘 Academic Details
  admissionNumber?: string;
  penNumber?: string;
  currentClass: string;
  section?: string;
  rollNumber?: string;
  session?: string;

  // 📞 Contact Details
  email?: string;
  mobile?: string;
  address?: string;

  // 📝 Extra (for future)
  bloodGroup?: string;
  category?: string;
  religion?: string;
  nationality?: string; // default is "Indian" in schema
  status?: 'active' | 'inactive'; // default is "active"

  // 📆 Timestamps
  admittedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
