import createError from 'http-errors';
import express, { json, urlencoded, static as expressStatic } from 'express';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';

import { authenticateToken } from './middleware/auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// view engine setup
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressStatic(join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.get('/', (req, res) => {
  res.json({ message: 'Express.js server and supabase is running' });
});

app.get('/users', async (req, res) =>{
  try{
    const { data, error } = await supabase
      .from('users')
      .select('*');
    if(error) throw error;
    res.json({ users: data });
  } catch(error){
    res.status(500).json({ error: error.message });
  }
})

app.get('/users/:id', async (req, res) =>{
  try{
    const { id } = req.params;
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();
    if(error) throw error;
    res.json({ user: data });
  } catch(error){
    res.status(500).json({ error: error.message });
  }
});

app.post('/users', async (req, res) =>{
  try{
    const { name, email } = req.body;
    const { data, error } = await supabase
      .from('users')
      .insert([{ name, email }])
      .select();
    if(error) throw error;
    res.status(201).json({ user: data[0] });
  } catch(error){
    res.status(500).json({ error: error.message });
  }
});

app.put('/users/:id', async (req, res) =>{
  try{
    const { id } = req.params;
    const { name, email } = req.body;
    const { data, error } = await supabase
      .from('users')
      .update({ name, email })
      .eq('id', id)
      .select();
    if(error) throw error;
    res.json({ user: data[0] });
  } catch(error){
    res.status(500).json({ error: error.message });
  }
});

app.delete('/users/:id', async (req, res) =>{
  try{
    const { id } = req.params;
    const { data, error } = await supabase
      .from('users')
      .delete()
      .eq('id', id)
    if(error) throw error;
    res.json({ user: data[0] });
  } catch(error){
    res.status(500).json({ error: error.message });
  }
});

app.post('/auth/signup', async (req, res) => {
  try {
    const { email, password } = req.body;
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    res.status(201).json({ user: data.user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/auth/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    res.json({ user: data.user, session: data.session });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/auth/user', async (req, res) => {
  try {
    const { data, error } = await supabase.auth.getUser();
    if (error) throw error;
    res.json({ user: data.user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/auth/signout', async (req, res) => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    res.json({ message: 'Signed out successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
