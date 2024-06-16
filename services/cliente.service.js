
const Cliente = require('../models/Cliente');

export class ClienteService {
  
    constructor() {
      this.repo = new UserRepository();
      this.countryRepo = new CountryRepository();
    }
  
    getCliente = async (id) => {
        try {
          const response = await this.repo.getById(id);
          response.password = "xxxxxxxxxxxxxxxxxx";
          const country = await this.countryRepo.getById(response.country);
          console.log(country);
          // response.country = country.name;
          console.log(response);
          return response;
        } catch (error) {
          throw new Error(error.message);
        }
      };
    
}