import { UntypedFormBuilder, Validators } from '@angular/forms';

export function generateFormGroup(fb: UntypedFormBuilder) {
  const { required, email, minLength, maxLength } = Validators;
  return fb.group({
    profilePhoto: [''],
    firstName: ['', [required]],
    lastName: ['', [required]],
    middleName: [''],
    preferredName: [''],
    building: [''],
    street: [''],
    city: [''],
    state: [''],
    zip: ['', [minLength(5), maxLength(5)]],
    cellPhoneNumber:  ['', [required, minLength(10), maxLength(10)]],
    workPhoneNumber: ['', [minLength(10), maxLength(10)]],
    make:[''],
    model:[''],
    color:[''],
    email: ['', [required, email]],
    ssn: ['', [required, minLength(9), maxLength(9)]],
    birthDate: [''],
    gender: [''],
    citizenship:[''],
    authorization:[''],
    type:[''],
    visaTitle:[''],
    startDate: [''],
    endDate: [''],
    dirverLicense:[''],
    driverLicenseNumber:[''],
    expirationDate:[''],

    efirstName: [''],
    elastName: [''],
    emiddleName: [''],
    ephone: [''],
    eemail: ['', [email]],
    erelationship: [''],

    workAuthDoc: fb.array([]),

  });
}

export function getInitialValue(user: any) {
  const workAuthDoc = (user.workAuthDoc || []).map((workDoc: any) => ({
    type: workDoc.type,
    status: workDoc.status,
    file: workDoc.file,
    feedback: workDoc.feedback,
  }));

  return {
    profilePhoto:
      !user.profilePhoto || user.profilePhoto === 'defaultImage'
        ? '../../../assets/profile.png'
        : user.profilePhoto,
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    middleName: user.middleName || '',
    preferredName: user.preferredName || '',
    email: user.email || '',
    birthDate: user.birthDate || '',
    gender: user.gender || '',

    building: user.currentAddress?.building || '',
    street: user.currentAddress?.street || '',
    city: user.currentAddress?.city || '',
    state: user.currentAddress?.state || '',
    zip: user.currentAddress?.zip || '',

    cellPhoneNumber: user.cellPhoneNumber || '',
    workPhoneNumber: user.workPhoneNumber || '',

    type: user.visa?.type || '',
    startDate: user.visa?.startDate || '',
    endDate: user.visa?.endDate || '',

    efirstName: user.emergencyContact?.firstName || '',
    elastName: user.emergencyContact?.lastName || '',
    emiddleName: user.emergencyContact?.middleName || '',
    ephone: user.emergencyContact?.phone || '',
    eemail: user.emergencyContact?.email || '',
    erelationship: user.emergencyContact?.relationship || '',

    make: user.carInfo.make,
    model: user.carInfo.model,
    color: user.carInfo.color,

    hasDriverLicense: user.driverLicense.licenseNumber ? 'Yes' : 'No',
    dlicenseNumber: user.driverLicense.licenseNumber || '',
    dexpirationDate: user.driverLicense.expirationDate || '',
    dphoto: user.driverLicense.photo || '',
    workAuthDoc
  };
}

export function buildFinalValues(value: any) {
  const {
    building,
    street,
    city,
    state,
    zip,

    efirstName,
    elastName,
    emiddleName,
    ephone,
    eemail,
    erelationship,

    make,
    model,
    color,

    dlicenseNumber,
    dexpirationDate,
    dphoto,

    workAuthDoc,

    type,
    startDate,
    endDate, 

    ...rest
  } = value;
  return {
    ...rest,
    currentAddress: {
      building,
      street,
      city,
      state,
      zip,
    },
    emergencyContact: {
      firstName: efirstName,
      lastName: elastName,
      middleName: emiddleName,
      phone: ephone,
      email: eemail,
      relationship: erelationship,
    },
    carInfo: {
      make,
      model,
      color,
    },
    driverLicense: {
      licenseNumber: dlicenseNumber,
      expirationDate: dexpirationDate,
      photo: dphoto,
    },
    visa: {
      type,
      startDate,
      endDate
    },
    workAuthDoc
  };
}
