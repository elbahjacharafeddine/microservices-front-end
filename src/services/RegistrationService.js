import axios from 'axios';

const REGISTRATION_API_BASE_URL="http://192.168.48.158:8082/rest/inscriptions";
const UNIVERSITY_API_BASE_URL="http://192.168.48.158:8082/rest/universities";

// /addinscription


const ADD_REGISTRATION_API_BASE_URL="http://192.168.48.158:8082/rest/addinscription";
const GETBYID_REGISTRATION_API_BASE_URL="http://192.168.48.158:8082/rest/inscription";
const UPDATE_REGISTRATION_API_BASE_URL="http://192.168.48.158:8082/rest/updateinscription";
const DELETE_REGISTRATION_API_BASE_URL="http://192.168.48.158:8082/rest/deleteinscription";

///UNIVERSITY
const ADD_UNIVERSITY_API_BASE_URL="http://192.168.48.158:8082/rest/adduniversity";
const GETBYID_UNIVERSITY_API_BASE_URL="http://192.168.48.158:8082/rest/university";
const UPDATE_UNIVERSITY_API_BASE_URL="http://192.168.48.158:8082/rest/updateuniversity";
const DELETE_UNIVERSITY_API_BASE_URL="http://192.168.48.158:8082/rest/deleteuniversity";


class RegistrationService{
    getRegistrations(){
        return axios.get(REGISTRATION_API_BASE_URL);
    }

    createRegistration(registration) {
        return axios.post(ADD_REGISTRATION_API_BASE_URL,registration);
    }

    getRegistrationById(registrationId){
        return axios.get(GETBYID_REGISTRATION_API_BASE_URL + '/' + registrationId);
    }
    deleteRegistration(registrationId){
        return axios.delete(DELETE_REGISTRATION_API_BASE_URL + '/' + registrationId);
    }


    updateRegistration(registration,registration_id){
        return axios.put( UPDATE_REGISTRATION_API_BASE_URL + '/' + registration_id,registration);
    }

    getUniversities(){
        return axios.get(UNIVERSITY_API_BASE_URL);
    }

    createUniversity(registration) {
        return axios.post(ADD_UNIVERSITY_API_BASE_URL,registration);
    }

    getUniversityById(registrationId){
        return axios.get(GETBYID_UNIVERSITY_API_BASE_URL + '/' + registrationId);
    }
    deleteUniversity(registrationId){
        return axios.delete(DELETE_UNIVERSITY_API_BASE_URL + '/' + registrationId);
    }


    updateUniversity(registration,registration_id){
        return axios.put(UPDATE_UNIVERSITY_API_BASE_URL + '/' + registration_id,registration);
    }
}

export default new RegistrationService()

