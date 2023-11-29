// search.router.js
import express from 'express';
import { searchSongs } from '../Controllers/search.controller.js';

const searchRouter = express.Router();

// Route for søgning
searchRouter.get('/', searchSongs);

export default searchRouter;
