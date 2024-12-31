export const genderOptions = ['Masculino', 'Feminino', 'Outro']

export const PatientFormDefaultValues = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  birthDate: new Date(Date.now()),
  gender: '' as Gender,
  address: '',
  occupation: '',
  emergencyContactName: '',
  emergencyContactPhone: '',
  primaryPhysician: '',
  insuranceProvider: '',
  insurancePolicyNumber: '',
  allergies: '',
  currentMedication: '',
  familyMedicalHistory: '',
  pastMedicalHistory: '',
  identificationType: 'Carteira de Identidade Nacional',
  identificationNumber: '',
  identificationDocument: [],
  treatmentConsent: false,
  disclosureConsent: false,
  privacyConsent: false,
}

export const IdentificationTypes = [
  'Certidão de Nascimento',
  'Carteira de Motorista',
  'Cartão de Seguro Médico/Política',
  'Carteira de Identidade Militar',
  'Passaporte',
  'Cartão de Residente Estrangeiro',
  'Cartão de Seguro Social',
  'Carteira de Identidade Nacional',
  'Título de Eleitor',
]

export const Doctors = [
  {
    image: '/assets/images/dr-green.png',
    name: 'João Verde',
  },
  {
    image: '/assets/images/dr-cameron.png',
    name: 'Leila Camargo',
  },
  {
    image: '/assets/images/dr-livingston.png',
    name: 'David Lima',
  },
  {
    image: '/assets/images/dr-peter.png',
    name: 'Evan Pereira',
  },
  {
    image: '/assets/images/dr-powell.png',
    name: 'Jane Paiva',
  },
  {
    image: '/assets/images/dr-remirez.png',
    name: 'Alex Ramírez',
  },
  {
    image: '/assets/images/dr-lee.png',
    name: 'Jasmin Oliveira',
  },
  {
    image: '/assets/images/dr-cruz.png',
    name: 'Alyana Cruz',
  },
  {
    image: '/assets/images/dr-sharma.png',
    name: 'Henrique Souza',
  },
]

export const StatusIcon = {
  scheduled: '/assets/icons/check.svg',
  pending: '/assets/icons/pending.svg',
  cancelled: '/assets/icons/cancelled.svg',
}

export const TranslatedStatus = {
  scheduled: 'Agendado',
  pending: 'Pendente',
  cancelled: 'Cancelado',
}
