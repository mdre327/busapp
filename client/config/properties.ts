/**
 * This file set the environment properties
 */

import { configDev } from './properties.dev';
import { configProd } from './properties.prod';

export var config: any;

if(ENV == "dev"){
  config = configDev;
}
if(ENV == "prod"){
  config = configProd;
}

