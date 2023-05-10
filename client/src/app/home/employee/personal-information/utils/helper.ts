import { UntypedFormBuilder, Validators } from '@angular/forms';

export function generateFormGroup(fb: UntypedFormBuilder) {
  const { required, email, minLength, maxLength } = Validators;
  return fb.group({
    profilePhoto: [''],
    firstName: ['', [required]],
    lastName: ['', [required]],
    middleName: [''],
    preferredName: [''],
    email: ['', [required, email]],
    birthDate: [''],
    gender: [''],
    building: [''],
    street: [''],
    city: [''],
    state: [''],
    zip: ['', [minLength(6), maxLength(6)]],
    cellPhoneNumber: ['', [minLength(5)]],
    workPhoneNumber: ['', [minLength(5)]],

    type: [''],
    startDate: [''],
    endDate: [''],

    // emergencyContact
    efirstName: [''],
    elastName: [''],
    emiddleName: [''],
    ephone: [''],
    eemail: ['', [email]],
    erelationship: [''],

    // workAuthDoc
    workAuthDoc: [[]],

    // driverLicense
    dlicenseNumber: [''],
    dexpirationDate: [''],
    dphoto: [''],
  });
}

export function getInitialValue(user: any) {
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

    workAuthDoc: user.workAuthDoc || [],

    dlicenseNumber: user.driverLicense.licenseNumber || '',
    dexpirationDate: user.driverLicense.expirationDate || '',
    dphoto: user.driverLicense.photo || '',
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

    workAuthDoc,

    dlicenseNumber,
    dexpirationDate,
    dphoto,
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
    workAuthDoc,

    driverLicense: {
      licenseNumber: dlicenseNumber,
      expirationDate: dexpirationDate,
      photo: dphoto,
    },
  };
}
