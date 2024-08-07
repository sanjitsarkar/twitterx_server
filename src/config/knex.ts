import Knex from 'knex';
import { Model } from 'objection';
import knexConfig from '../knexfile';
// Initialize Knex.
const knex = Knex(knexConfig.development);

// Bind all Models to the Knex instance.
Model.knex(knex);

export default knex;