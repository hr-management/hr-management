import { UntypedFormBuilder, Validators } from '@angular/forms';

export function generateFormGroup(fb: UntypedFormBuilder) {
  const { required, email, minLength, maxLength } = Validators;
  return fb.group({
    //profilePhoto
    profilePhoto: [''],

    //name
    firstName: ['', [required]],
    lastName: ['', [required]],
    middleName: [''],
    preferredName: [''],
    email: ['', [required, email]],
    ssn: ['', [required, minLength(9), maxLength(9)]],
    birthDate: ['', [required]],
    gender: [''],

    //address
    building: [''],
    street: ['', [required]],
    city: ['', [required]],
    state: ['', [required]],
    zip: ['', [required, minLength(5), maxLength(5)]],

    //contact info
    cellPhoneNumber:  ['', [required, minLength(10), maxLength(10)]],
    workPhoneNumber: ['', [minLength(10), maxLength(10)]],

    //employeement
    type: [''],
    startDate: [''],
    endDate: [''],

     // emergencyContact
     efirstName: ['', [required]],
     elastName: ['', [required]],
     emiddleName: [''],
     ephone: ['', [required]],
     eemail: ['', [required, email]],
     erelationship: ['', [required]],

    citizenship: ['', [required]],

    // carInfo
    make: [''],
    model: [''],
    color: [''],


    // workAuthDoc
    workAuthDoc: fb.array([]),
    
    // driverLicense
    hasDriverLicense: ['No'],
    dlicenseNumber: [''],
    dexpirationDate: [''],
    dphoto: [''],
  });
}

const defaultProfile = '../../../assets/profile.png';

export function getInitialValue(user: any, fb: UntypedFormBuilder) {
  const initialValue = {
    profilePhoto:
      !user.profilePhoto || user.profilePhoto === 'defaultImage'
        ? defaultProfile
        : user.profilePhoto,
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    middleName: user.middleName || '',
    preferredName: user.preferredName || '',
    email: user.email || '',
    ssn: user.ssn || '',
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

    make: user.carInfo.make,
    model: user.carInfo.model,
    color: user.carInfo.color,

    citizenship: user.citizenship || '',

    efirstName: user.emergencyContact?.firstName || '',
    elastName: user.emergencyContact?.lastName || '',
    emiddleName: user.emergencyContact?.middleName || '',
    ephone: user.emergencyContact?.phone || '',
    eemail: user.emergencyContact?.email || '',
    erelationship: user.emergencyContact?.relationship || '',

    hasDriverLicense: user.driverLicense.licenseNumber ? 'Yes' : 'No',
    dlicenseNumber: user.driverLicense.licenseNumber || '',
    dexpirationDate: user.driverLicense.expirationDate || '',
    dphoto: user.driverLicense.photo || '',
  };

  const workAuthDoc = (user.workAuthDoc || []).map((workDoc: any) => ({
    type: workDoc.type,
    status: workDoc.status,
    file: workDoc.file,
    feedback: workDoc.feedback,
  }));
  return { initialValue, workAuthDoc };
}

export function buildFinalValues(value: any) {
  const {
    building,
    street,
    city,
    state,
    zip,
    
    type,
    startDate,
    endDate,

    efirstName,
    elastName,
    emiddleName,
    ephone,
    eemail,
    erelationship,

    workAuthDoc,

    dlicenseNumber,
    dexpirationDate,
    dphoto,

    make,
    model,
    color,
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
    visa: {
      type,
      startDate,
      endDate
    },
    carInfo: {
      make,
      model,
      color,
    },
    emergencyContact: {
      firstName: efirstName,
      lastName: elastName,
      middleName: emiddleName,
      phone: ephone,
      email: eemail,
      relationship: erelationship,
    },
    workAuthDoc,

    driverLicense: {
      licenseNumber: dlicenseNumber,
      expirationDate: dexpirationDate,
      photo: dphoto,
    },
  };
}
