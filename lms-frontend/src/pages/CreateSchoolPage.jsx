import React, { useState } from 'react';

function CreateSchoolPage({ navigateTo }) {
  const [formData, setFormData] = useState({
    name: '',
    subdomain: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    contactEmail: '',
    contactPhone: '',
    description: '',
    principalName: '',
    establishedDate: '',
    totalStudents: '',
    totalTeachers: '',
    lmsEnabled: false,
    lmsUrl: '',
    facilities: '', // Comma separated string
    // superAdminKey: '', // সুপার অ্যাডমিন কী এখন আর ফ্রন্টএন্ড ফর্মে প্রয়োজন নেই
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setLoading(true);

    try {
      const payload = {
        ...formData,
        totalStudents: parseInt(formData.totalStudents) || 0,
        totalTeachers: parseInt(formData.totalTeachers) || 0,
        facilities: formData.facilities.split(',').map(f => f.trim()).filter(f => f !== ''),
        // establishedDate should be a valid Date object or ISO string
        establishedDate: formData.establishedDate ? new Date(formData.establishedDate).toISOString() : undefined,
      };

      // superAdminKey এখন আর payload থেকে সরানোর প্রয়োজন নেই কারণ এটি ফর্মে নেই
      // const superAdminKey = payload.superAdminKey;
      // delete payload.superAdminKey;

      const response = await fetch('http://localhost:5000/api/schools', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'X-Super-Admin-Key': superAdminKey, // এই হেডারটি এখন আর পাঠানোর প্রয়োজন নেই
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('স্কুল সফলভাবে তৈরি হয়েছে! আইডি: ' + data.school._id);
        setError('');
        // Optionally, navigate to the newly created school's page
        // navigateTo(`/${data.school._id}`);
        setFormData({ // Clear form after successful submission
            name: '', subdomain: '', address: '', city: '', state: '', zipCode: '',
            contactEmail: '', contactPhone: '', description: '', principalName: '',
            establishedDate: '', totalStudents: '', totalTeachers: '',
            lmsEnabled: false, lmsUrl: '', facilities: '' // superAdminKey সরানো হয়েছে
        });
      } else {
        setError(data.message || 'স্কুল তৈরি করতে ব্যর্থ হয়েছে।');
        setMessage('');
      }
    } catch (err) {
      console.error('Error creating school:', err);
      setError('সার্ভারের সাথে সংযোগে সমস্যা হয়েছে।');
      setMessage('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center w-full">
      <div className="bg-card-bg rounded-default shadow-custom p-8 text-left w-full max-w-2xl">
        <h1 className="text-primary mb-6 text-3xl font-bold text-center">নতুন স্কুল তৈরি করুন</h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* School Basic Info */}
          <div>
            <label htmlFor="name" className="block text-text-dark text-sm font-bold mb-2">স্কুলের নাম:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-border-light rounded-default focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              required
            />
          </div>
          <div>
            <label htmlFor="subdomain" className="block text-text-dark text-sm font-bold mb-2">সাবডোমেইন:</label>
            <input
              type="text"
              id="subdomain"
              name="subdomain"
              value={formData.subdomain}
              onChange={handleChange}
              className="w-full p-2 border border-border-light rounded-default focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              required
              placeholder="যেমন: mohadevpursorbomongola"
            />
          </div>
          <div>
            <label htmlFor="address" className="block text-text-dark text-sm font-bold mb-2">ঠিকানা:</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-2 border border-border-light rounded-default focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              required
            />
          </div>
          <div>
            <label htmlFor="city" className="block text-text-dark text-sm font-bold mb-2">শহর:</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full p-2 border border-border-light rounded-default focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              required
            />
          </div>
          <div>
            <label htmlFor="state" className="block text-text-dark text-sm font-bold mb-2">রাজ্য/বিভাগ:</label>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full p-2 border border-border-light rounded-default focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              required
            />
          </div>
          <div>
            <label htmlFor="zipCode" className="block text-text-dark text-sm font-bold mb-2">পোস্ট কোড:</label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              className="w-full p-2 border border-border-light rounded-default focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              required
            />
          </div>
          <div>
            <label htmlFor="contactEmail" className="block text-text-dark text-sm font-bold mb-2">যোগাযোগের ইমেল:</label>
            <input
              type="email"
              id="contactEmail"
              name="contactEmail"
              value={formData.contactEmail}
              onChange={handleChange}
              className="w-full p-2 border border-border-light rounded-default focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              required
            />
          </div>
          <div>
            <label htmlFor="contactPhone" className="block text-text-dark text-sm font-bold mb-2">যোগাযোগের ফোন:</label>
            <input
              type="text"
              id="contactPhone"
              name="contactPhone"
              value={formData.contactPhone}
              onChange={handleChange}
              className="w-full p-2 border border-border-light rounded-default focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* School Info Details */}
          <div className="md:col-span-2">
            <label htmlFor="description" className="block text-text-dark text-sm font-bold mb-2">বর্ণনা:</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full p-2 border border-border-light rounded-default focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            ></textarea>
          </div>
          <div>
            <label htmlFor="principalName" className="block text-text-dark text-sm font-bold mb-2">অধ্যক্ষের নাম:</label>
            <input
              type="text"
              id="principalName"
              name="principalName"
              value={formData.principalName}
              onChange={handleChange}
              className="w-full p-2 border border-border-light rounded-default focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div>
            <label htmlFor="establishedDate" className="block text-text-dark text-sm font-bold mb-2">প্রতিষ্ঠাকাল:</label>
            <input
              type="date"
              id="establishedDate"
              name="establishedDate"
              value={formData.establishedDate}
              onChange={handleChange}
              className="w-full p-2 border border-border-light rounded-default focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div>
            <label htmlFor="totalStudents" className="block text-text-dark text-sm font-bold mb-2">মোট শিক্ষার্থী:</label>
            <input
              type="number"
              id="totalStudents"
              name="totalStudents"
              value={formData.totalStudents}
              onChange={handleChange}
              className="w-full p-2 border border-border-light rounded-default focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div>
            <label htmlFor="totalTeachers" className="block text-text-dark text-sm font-bold mb-2">মোট শিক্ষক:</label>
            <input
              type="number"
              id="totalTeachers"
              name="totalTeachers"
              value={formData.totalTeachers}
              onChange={handleChange}
              className="w-full p-2 border border-border-light rounded-default focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="md:col-span-2 flex items-center">
            <input
              type="checkbox"
              id="lmsEnabled"
              name="lmsEnabled"
              checked={formData.lmsEnabled}
              onChange={handleChange}
              className="mr-2 h-4 w-4 text-primary rounded focus:ring-primary"
            />
            <label htmlFor="lmsEnabled" className="text-text-dark text-sm font-bold">LMS সক্ষম?</label>
          </div>
          {formData.lmsEnabled && (
            <div className="md:col-span-2">
              <label htmlFor="lmsUrl" className="block text-text-dark text-sm font-bold mb-2">LMS URL:</label>
              <input
                type="url"
                id="lmsUrl"
                name="lmsUrl"
                value={formData.lmsUrl}
                onChange={handleChange}
                className="w-full p-2 border border-border-light rounded-default focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
          )}
          <div className="md:col-span-2">
            <label htmlFor="facilities" className="block text-text-dark text-sm font-bold mb-2">সুবিধাদি (কমা দ্বারা পৃথক করুন):</label>
            <input
              type="text"
              id="facilities"
              name="facilities"
              value={formData.facilities}
              onChange={handleChange}
              className="w-full p-2 border border-border-light rounded-default focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              placeholder="যেমন: Library, Computer Lab, Playground"
            />
          </div>

          {/* Super Admin Key (removed as per request) */}
          {/* <div className="md:col-span-2 mt-4">
            <label htmlFor="superAdminKey" className="block text-text-dark text-sm font-bold mb-2">সুপার অ্যাডমিন কী:</label>
            <input
              type="password"
              id="superAdminKey"
              name="superAdminKey"
              value={formData.superAdminKey}
              onChange={handleChange}
              className="w-full p-2 border border-border-light rounded-default focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              required
            />
          </div> */}

          <div className="md:col-span-2 text-center mt-6">
            <button
              type="submit"
              className="py-3 px-8 bg-primary text-white font-bold rounded-default hover:bg-blue-600 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? 'তৈরি করা হচ্ছে...' : 'স্কুল তৈরি করুন'}
            </button>
          </div>
        </form>
        {message && <p className="text-green-600 mt-4 text-center font-medium">{message}</p>}
        {error && <p className="text-error-red mt-4 text-center font-medium">{error}</p>}
        <button
          onClick={() => navigateTo('/')}
          className="w-full max-w-[200px] py-3 px-6 border-none rounded-default bg-gray-600 text-white text-base cursor-pointer transition-all duration-300 ease-in-out hover:translate-y-[-2px] hover:opacity-90 active:translate-y-0 mt-5 mx-auto block"
        >
          হোমপেজে ফিরে যান
        </button>
      </div>
    </div>
  );
}

export default CreateSchoolPage;