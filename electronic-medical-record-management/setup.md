# Quick Setup Guide

## 🚀 Quick Start

1. **Install Dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Open Application**
   - Navigate to: `http://localhost:5173`
   - Ensure backend is running on: `http://localhost:8000`

## 📋 Pre-flight Checklist

- [ ] Node.js installed (v16+)
- [ ] Backend API running on port 8000
- [ ] Dependencies installed
- [ ] Development server started

## 🔧 Troubleshooting

### Dependency Issues
If you encounter peer dependency conflicts:
```bash
npm install --legacy-peer-deps --force
```

### API Connection Issues
1. Check backend is running: `http://localhost:8000`
2. Verify API endpoints in browser network tab
3. Check CORS settings in backend

### Build Issues
```bash
npm run build
```

## 🎯 Test the Application

1. **Dashboard**: Visit `/` - Should show overview with quick actions
2. **Medical Records**: Visit `/doctor/record` - Create a new medical record
3. **Patient History**: Visit `/patient/history` - Search for patient records
4. **Prescriptions**: Visit `/doctor/prescription` - Create prescriptions
5. **Reports**: Visit `/reports` - Upload and view reports

## 📱 Features to Test

### Medical Record Entry
- Fill out patient information
- Add clinical details
- Submit and verify success message
- Check redirection to patient history

### Patient History
- Search by patient ID
- View record cards
- Click "View Details" buttons
- Test quick action buttons

### Prescription Creation
- Add multiple medications
- Test form validation
- Submit prescription
- View prescription details

### Reports Management
- Upload new reports
- Search by record ID
- View report details
- Test file URL links

## 🔗 API Integration

The frontend connects to these backend endpoints:
- Medical Records: `/medical-records/`
- Prescriptions: `/prescriptions/`
- Reports: `/reports/`

Make sure your backend is running and accessible!