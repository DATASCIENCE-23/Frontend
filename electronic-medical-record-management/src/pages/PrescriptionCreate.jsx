import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Save, Pill, Plus, Trash2, User, FileText } from "lucide-react";
import Layout from "../components/Layout";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import { prescriptionsAPI } from "../api/prescriptions";

export default function PrescriptionCreate() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    patient_id: searchParams.get('patientId') || '',
    record_id: searchParams.get('recordId') || '',
    prescription_date: new Date().toISOString().split('T')[0],
    status: 'active',
    notes: '',
    medications: [
      {
        medication_name: '',
        dosage: '',
        frequency: '',
        duration: '',
        instructions: ''
      }
    ]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMedicationChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      medications: prev.medications.map((med, i) => 
        i === index ? { ...med, [field]: value } : med
      )
    }));
  };

  const addMedication = () => {
    setFormData(prev => ({
      ...prev,
      medications: [
        ...prev.medications,
        {
          medication_name: '',
          dosage: '',
          frequency: '',
          duration: '',
          instructions: ''
        }
      ]
    }));
  };

  const removeMedication = (index) => {
    if (formData.medications.length > 1) {
      setFormData(prev => ({
        ...prev,
        medications: prev.medications.filter((_, i) => i !== index)
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // For demo purposes, using doctor_id = 1. In real app, get from auth context
      const doctorId = 1;
      
      const prescriptionData = {
        prescription_date: formData.prescription_date,
        status: formData.status,
        notes: formData.notes,
        medications: formData.medications.filter(med => med.medication_name.trim())
      };

      const result = await prescriptionsAPI.createPrescription(
        doctorId,
        parseInt(formData.record_id),
        parseInt(formData.patient_id),
        prescriptionData
      );
      
      setSuccess(true);
      setTimeout(() => {
        navigate(`/prescription/${result.prescription_id}`);
      }, 2000);
      
    } catch (err) {
      setError(err.response?.data?.detail || err.message || 'Failed to create prescription');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto p-6">
          <div className="bg-green-50 border border-green-200 rounded-md p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <Pill className="h-5 w-5 text-green-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800">
                  Prescription Created Successfully
                </h3>
                <div className="mt-2 text-sm text-green-700">
                  <p>The prescription has been saved. Redirecting to prescription details...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center">
            <Pill className="h-8 w-8 text-purple-600 mr-3" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Create Prescription</h1>
              <p className="text-gray-600 mt-1">Write a new prescription for patient</p>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-6">
            <ErrorMessage message={error} onRetry={() => setError(null)} />
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6 bg-white shadow-sm rounded-lg p-6">
          {/* Patient & Record Information */}
          <div className="border-b border-gray-200 pb-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <User className="h-5 w-5 mr-2" />
              Patient & Record Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Patient ID *
                </label>
                <input
                  type="number"
                  name="patient_id"
                  value={formData.patient_id}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  required
                  placeholder="Enter patient ID"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Medical Record ID *
                </label>
                <input
                  type="number"
                  name="record_id"
                  value={formData.record_id}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  required
                  placeholder="Enter record ID"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prescription Date *
                </label>
                <input
                  type="date"
                  name="prescription_date"
                  value={formData.prescription_date}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  required
                />
              </div>
            </div>
          </div>

          {/* Medications */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900 flex items-center">
                <Pill className="h-5 w-5 mr-2" />
                Medications
              </h2>
              <button
                type="button"
                onClick={addMedication}
                className="flex items-center px-3 py-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Medication
              </button>
            </div>

            {formData.medications.map((medication, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 relative">
                {formData.medications.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeMedication(index)}
                    className="absolute top-2 right-2 p-1 text-red-600 hover:bg-red-50 rounded"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
                
                <h3 className="text-md font-medium text-gray-900 mb-4">
                  Medication {index + 1}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Medication Name *
                    </label>
                    <input
                      type="text"
                      value={medication.medication_name}
                      onChange={(e) => handleMedicationChange(index, 'medication_name', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      placeholder="e.g., Amoxicillin, Ibuprofen"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Dosage *
                    </label>
                    <input
                      type="text"
                      value={medication.dosage}
                      onChange={(e) => handleMedicationChange(index, 'dosage', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      placeholder="e.g., 500mg, 10ml"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Frequency *
                    </label>
                    <select
                      value={medication.frequency}
                      onChange={(e) => handleMedicationChange(index, 'frequency', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      required
                    >
                      <option value="">Select frequency</option>
                      <option value="Once daily">Once daily</option>
                      <option value="Twice daily">Twice daily</option>
                      <option value="Three times daily">Three times daily</option>
                      <option value="Four times daily">Four times daily</option>
                      <option value="Every 4 hours">Every 4 hours</option>
                      <option value="Every 6 hours">Every 6 hours</option>
                      <option value="Every 8 hours">Every 8 hours</option>
                      <option value="As needed">As needed</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Duration
                    </label>
                    <input
                      type="text"
                      value={medication.duration}
                      onChange={(e) => handleMedicationChange(index, 'duration', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      placeholder="e.g., 7 days, 2 weeks"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Special Instructions
                    </label>
                    <textarea
                      value={medication.instructions}
                      onChange={(e) => handleMedicationChange(index, 'instructions', e.target.value)}
                      rows={2}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      placeholder="e.g., Take with food, Avoid alcohol"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Information */}
          <div className="space-y-4">
            <h2 className="text-lg font-medium text-gray-900 flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Additional Information
            </h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Notes
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="Any additional notes, warnings, or patient instructions"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !formData.patient_id || !formData.record_id}
              className="flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <LoadingSpinner size="sm" />
              ) : (
                <Save className="h-5 w-5 mr-2" />
              )}
              {loading ? 'Creating...' : 'Create Prescription'}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}