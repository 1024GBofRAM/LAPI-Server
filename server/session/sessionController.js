const Session = require('./sessionModel');

const sessionController = {};

/**
* isLoggedIn - find the appropriate session for this request in the database, then
* verify whether or not the session is still valid.
*
*
*/
sessionController.isLoggedIn = async (req, res, next) => {
  try {
    // If session exists for current sid and if the session is not expired
    if (res.locals.userId = (await Session.findById(req.cookies.sid)).cookieId) next();
    // Else respond with error status
    else res.status(401).send('Invalid or expired token')
  }
  catch (err) {
    console.log(err);
    res.status(401);
    res.send('Invalid or expired token')
  }
};

/**
* startSession - create a new Session model and then save the new session to the
* database.
*
*
*/
sessionController.startSession = async (req, res, next) => {
  try {
    // Save the sid cookie to the db as a new session model instance
    const session = new Session({cookieId: res.locals.userId});
    res.cookie('sid',(await session.save())._id);
    next();
  }
  catch (err) {
    console.log('Error starting session', err)
    res.status(500);
    res.send();
  }
};

module.exports = sessionController;
