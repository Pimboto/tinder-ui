import { Checkpoint } from '../types/types';

// Checkpoint data con descripciones detalladas
export const CHECKPOINTS: Checkpoint[] = [
  { id: 'deletePhotos', label: 'Borrar Fotos', description: 'Elimina fotos existentes antes de iniciar' },
  { id: 'setProxy', label: 'Configurar Proxy', description: 'Establece conexión proxy para la sesión' },
  { id: 'start', label: 'Inicio', description: 'Punto de partida de la automatización' },
  { id: 'setLocation', label: 'Establecer Ubicación', description: 'Configura la geolocalización del dispositivo' },
  { id: 'createAccount', label: 'Crear Cuenta', description: 'Inicia el proceso de creación de cuenta' },
  { id: 'phoneInput', label: 'Ingresar Teléfono', description: 'Ingresa el número telefónico' },
  { id: 'verifyCode', label: 'Verificar Código', description: 'Verifica el código recibido por SMS' },
  { id: 'emailInput', label: 'Ingresar Email', description: 'Configura el correo electrónico' },
  { id: 'skipContacts', label: 'Saltar Contactos', description: 'Omite la sincronización de contactos' },
  { id: 'welcomeScreen', label: 'Pantalla Bienvenida', description: 'Navega por la pantalla de bienvenida' },
  { id: 'setupPhotosInitial', label: 'Configuración Inicial Fotos', description: 'Realiza la configuración inicial de fotos' },
  { id: 'profileBasics', label: 'Básicos de Perfil', description: 'Configura la información básica del perfil' },
  { id: 'birthDate', label: 'Fecha Nacimiento', description: 'Establece la fecha de nacimiento' },
  { id: 'genderSelection', label: 'Selección Género', description: 'Selecciona la identidad de género' },
  { id: 'sexualOrientation', label: 'Orientación Sexual', description: 'Configura la orientación sexual' },
  { id: 'interestSelection', label: 'Selección Intereses', description: 'Selecciona intereses personales' },
  { id: 'distancePreference', label: 'Preferencia Distancia', description: 'Establece la preferencia de distancia para matches' },
  { id: 'lookingFor', label: 'Buscando', description: 'Indica qué tipo de relación busca' },
  { id: 'educationSkip', label: 'Saltar Educación', description: 'Omite datos de educación' },
  { id: 'lifestyleQuestions', label: 'Preguntas Estilo Vida', description: 'Responde preguntas sobre estilo de vida' },
  { id: 'personalityQuestions', label: 'Preguntas Personalidad', description: 'Responde preguntas sobre personalidad' },
  { id: 'selectInterests', label: 'Seleccionar Intereses', description: 'Elige intereses específicos para el perfil' },
  { id: 'addPhotos', label: 'Añadir Fotos', description: 'Añade fotos al perfil' },
  { id: 'quickCaptchaCheck', label: 'Verificación Captcha', description: 'Verifica si hay captcha pendiente' },
  { id: 'finalizeSetup', label: 'Finalizar Configuración', description: 'Completa la configuración del perfil' },
  { id: 'tutorialIntro', label: 'Tutorial Inicial', description: 'Completa el tutorial de introducción' },
  { id: 'waitForActivity', label: 'Esperar Actividad', description: 'Espera por actividad en la aplicación' },
  { id: 'solveCaptcha', label: 'Resolver Captcha', description: 'Resuelve cualquier captcha que aparezca' },
  { id: 'waitTimeout', label: 'Tiempo Espera', description: 'Espera un tiempo determinado' },
  { id: 'checkLikes', label: 'Verificar Likes', description: 'Verifica los likes recibidos' },
  { id: 'genderSwap', label: 'Cambiar Género', description: 'Cambia el género del perfil' },
  { id: 'waitTimeAfterAccount', label: 'Espera Post-Creación', description: 'Espera después de crear la cuenta' },
  { id: 'importAccount', label: 'Importar Cuenta', description: 'Importa una cuenta existente' },
  { id: 'resetData', label: 'Reiniciar Datos', description: 'Reinicia todos los datos de la aplicación' }
];

// Tipos de nombres para el perfil
export const NAME_TYPES = [
  { value: 'similar', label: 'Similar - Nombres parecidos (Lola, Iris, Aura)' },
  { value: 'random', label: 'Aleatorio - Nombres generados aleatoriamente' },
  { value: 'variation', label: 'Variación - Variantes de nombres (IrisBaker, Sanlola)' },
  { value: 'phrase', label: 'Frase - Nombres tipo frase (Aurabel)' }
];

// Opciones de nombres predefinidos por tipo
export const NAME_VARIANTS = {
  similar: ['Lola', 'Iris', 'Aura'],
  variation: ['IrisBaker', 'Sanlola'],
  phrase: ['Aurabel']
};

// Configuración predeterminada
export const DEFAULT_CONFIG = {
  flow: "tinder",
  checkpoint: "setProxy",
  generateProfile: true,
  infinite: true,
  maxRuns: 99,
  maxConsecutiveErrors: 2,
  profileOptions: {
    age: 23,
    nameType: "similar",
    nameVariant: "Aurabel"
  },
  params: {
    waitTimeAfterCaptcha: 180000,
    photoCount: 6,
    dragDistanceSlider: true,
    totalAccountCreationTime: 1
  }
};
