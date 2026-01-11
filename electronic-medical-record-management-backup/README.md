# Electronic Medical Records Management Frontend

A comprehensive React-based frontend application for managing electronic medical records, prescriptions, and medical reports.

## Features

### 🏥 Core Functionality
- **Medical Record Entry**: Doctors can create detailed patient medical records
- **Patient Medical History**: View comprehensive patient medical history with read-only access for patients
- **Prescription Management**: Create, view, and manage prescriptions with structured medication forms
- **Medical Reports**: Upload and view medical reports and documents
- **Dashboard**: Overview with quick actions and recent activity

### 🎨 User Interface
- Modern, responsive design with Tailwind CSS
- Intuitive navigation with role-based access
- Loading states and error handling
- Form validation and user feedback
- Mobile-friendly interface

### 🔗 API Integration
- Full REST API integration with the backend
- Proper error handling and loading states
- Axios-based HTTP client with interceptors
- Real-time data updates

## Tech Stack

- **React 19** - Frontend framework
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API calls
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Modern icon library
- **Date-fns** - Date manipulation library
- **Vite** - Build tool and development server

## Project Structure

```
src/
├── api/                    # API integration layer
│   ├── config.js          # Axios configuration
│   ├── medicalRecords.js  # Medical records API
│   ├── prescriptions.js   # Prescriptions API
│   └── reports.js         # Reports API
├── components/            # Reusable components
│   ├── Layout.jsx         # Main layout wrapper
│   ├── LoadingSpinner.jsx # Loading component
│   └── ErrorMessage.jsx   # Error display component
├── hooks/                 # Custom React hooks
│   └── useApi.js          # API data fetching hook
├── pages/                 # Page components
│   ├── Dashboard.jsx      # Main dashboard
│   ├── MedicalRecordEntry.jsx    # Create medical records
│   ├── MedicalRecordDetail.jsx   # View medical record details
│   ├── PatientHistory.jsx        # Patient history view
│   ├── PrescriptionCreate.jsx    # Create prescriptions
│   ├── PrescriptionDetail.jsx    # View prescription details
│   └── Reports.jsx               # Reports management
└── theme/                 # Theme configuration
```

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Backend API running on `http://localhost:8000`

### Installation Steps

1. **Clone and navigate to the project**
   ```bash
   cd Frontend/electronic-medical-record-management
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## API Configuration

The frontend is configured to connect to the backend API at `http://localhost:8000`. To change this:

1. Update the `API_BASE_URL` in `src/api/config.js`
2. Ensure the backend server is running and accessible

## Pages & Features

### 1. Dashboard (`/`)
- Overview of system statistics
- Quick action buttons for common tasks
- Recent activity feed
- Navigation to all major features

### 2. Medical Record Entry (`/doctor/record`)
- Comprehensive form for creating medical records
- Patient information section
- Clinical information fields:
  - Chief complaint
  - History of present illness
  - Past medical history
  - Physical examination
  - Diagnosis
  - Treatment plan
  - Additional notes
- Form validation and error handling
- Success feedback and navigation

### 3. Patient History (`/patient/history`)
- Search patients by ID
- Display all medical records for a patient
- Read-only access for patients
- Quick actions for each record:
  - View details
  - Create prescription
  - View reports
- Responsive card layout

### 4. Medical Record Detail (`/medical-record/:id`)
- Detailed view of a specific medical record
- All clinical information displayed
- Action buttons for related tasks
- Delete functionality with confirmation

### 5. Prescription Creation (`/doctor/prescription`)
- Structured prescription form
- Multiple medication support
- Medication details:
  - Name, dosage, frequency
  - Duration and special instructions
- Dynamic add/remove medications
- Status management
- Form validation

### 6. Prescription Detail (`/prescription/:id`)
- Complete prescription information
- Medication list with details
- Status indicators with icons
- Action buttons:
  - Cancel prescription
  - Delete prescription
  - View patient history

### 7. Reports Management (`/reports/:recordId?`)
- Upload medical reports and documents
- Search reports by medical record ID
- Report types:
  - Lab Results
  - Radiology Report
  - Pathology Report
  - Consultation Report
  - Discharge Summary
  - Progress Note
  - Surgical Report
- File URL support for external documents
- View and download functionality

## User Roles & Access

### Doctor Access
- Create and edit medical records
- Write prescriptions
- Upload and view reports
- Full system access

### Patient Access (Read-only)
- View their medical history
- View their prescriptions
- View their reports
- Cannot create or edit records

## API Endpoints Used

### Medical Records
- `POST /medical-records/` - Create record
- `GET /medical-records/{id}` - Get specific record
- `GET /medical-records/patient/{id}` - Get patient history
- `PUT /medical-records/{id}` - Update record
- `DELETE /medical-records/{id}` - Delete record

### Prescriptions
- `POST /prescriptions/` - Create prescription
- `GET /prescriptions/{id}` - Get specific prescription
- `GET /prescriptions/patient/{id}` - Get patient prescriptions
- `GET /prescriptions/record/{id}` - Get record prescriptions
- `PATCH /prescriptions/{id}/cancel` - Cancel prescription
- `DELETE /prescriptions/{id}` - Delete prescription

### Reports
- `POST /reports/create` - Create report
- `GET /reports/{id}` - Get specific report
- `GET /reports/visit/{id}` - Get reports for visit

## Styling & Theming

The application uses Tailwind CSS for styling with:
- Consistent color scheme (blue primary, with purple, orange, green accents)
- Responsive design patterns
- Hover effects and transitions
- Loading and error states
- Form styling and validation states

## Error Handling

- Network error handling with retry functionality
- Form validation with user-friendly messages
- Loading states for all async operations
- Success feedback for completed actions
- Graceful fallbacks for missing data

## Future Enhancements

- Authentication and authorization
- Real-time notifications
- Advanced search and filtering
- Export functionality
- Print-friendly views
- Offline support
- File upload for reports
- Advanced reporting and analytics

## Contributing

1. Follow the existing code structure
2. Use TypeScript for new components (optional)
3. Maintain consistent styling with Tailwind CSS
4. Add proper error handling and loading states
5. Test all API integrations
6. Update documentation for new features

## Support

For issues or questions:
1. Check the backend API is running
2. Verify API endpoints in the browser network tab
3. Check console for JavaScript errors
4. Ensure all dependencies are installed correctly