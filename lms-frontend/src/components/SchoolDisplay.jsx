import React from 'react';

function SchoolDisplay({ school, schoolInfo }) {
  if (!school) {
    return <p className="text-gray-700">কোন স্কুলের তথ্য নেই।</p>;
  }

  return (
    <div className="text-left mt-5 p-5 border border-border-light rounded-default bg-gray-50">
      <h2 className="text-primary mt-0 mb-4 text-2xl font-semibold">{school.name.toUpperCase()}</h2>
      <p className="mb-2 text-lg">
        <strong className="text-text-dark">ঠিকানা:</strong> {school.address}, {school.city}, {school.state} - {school.zipCode}
      </p>
      <p className="mb-2 text-lg">
        <strong className="text-text-dark">যোগাযোগের ইমেল:</strong> {school.contactEmail}
      </p>
      {school.contactPhone && (
        <p className="mb-2 text-lg">
          <strong className="text-text-dark">যোগাযোগের ফোন:</strong> {school.contactPhone}
        </p>
      )}

      {schoolInfo && (
        <div className="mt-5 pt-5 border-t border-border-light">
          <h3 className="text-primary mt-0 mb-4 text-xl font-semibold">বিস্তারিত তথ্য:</h3>
          {schoolInfo.description && (
            <p className="mb-2 text-lg">
              <strong className="text-text-dark">বর্ণনা:</strong> {schoolInfo.description}
            </p>
          )}
          {schoolInfo.principalName && (
            <p className="mb-2 text-lg">
              <strong className="text-text-dark">অধ্যক্ষের নাম:</strong> {schoolInfo.principalName}
            </p>
          )}
          {schoolInfo.establishedDate && (
            <p className="mb-2 text-lg">
              <strong className="text-text-dark">প্রতিষ্ঠাকাল:</strong> {new Date(schoolInfo.establishedDate).toLocaleDateString('bn-BD')}
            </p>
          )}
          {schoolInfo.totalStudents && (
            <p className="mb-2 text-lg">
              <strong className="text-text-dark">মোট শিক্ষার্থী:</strong> {schoolInfo.totalStudents}
            </p>
          )}
          {schoolInfo.totalTeachers && (
            <p className="mb-2 text-lg">
              <strong className="text-text-dark">মোট শিক্ষক:</strong> {schoolInfo.totalTeachers}
            </p>
          )}
          {schoolInfo.lmsEnabled && (
            <p className="mb-2 text-lg">
              <strong className="text-text-dark">LMS সক্ষম:</strong> হ্যাঁ
            </p>
          )}
          {schoolInfo.lmsUrl && (
            <p className="mb-2 text-lg">
              <strong className="text-text-dark">LMS URL:</strong>{' '}
              <a href={schoolInfo.lmsUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                {schoolInfo.lmsUrl}
              </a>
            </p>
          )}
          {schoolInfo.facilities && schoolInfo.facilities.length > 0 && (
            <div>
              <p className="mb-2 text-lg">
                <strong className="text-text-dark">সুবিধাদি:</strong>
              </p>
              <ul className="list-disc pl-5 mt-2 text-lg">
                {schoolInfo.facilities.map((facility, index) => (
                  <li key={index} className="mb-1">
                    {facility}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SchoolDisplay