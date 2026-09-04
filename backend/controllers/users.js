const User = require("../models/user");
const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET;

module.exports = {
  signup,
  login,
  getMe,
  updateMe,
};

async function signup(req, res) {
  const user = new User(req.body);
  try {
    await user.save();
    const token = createJWT(user);
    res.json({ token });
  } catch (err) {
    res.status(400).json(err);
  }
}

async function login(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(401).json({ err: "bad credentials" });
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (isMatch) {
        const token = createJWT(user);
        res.json({ token });
      } else {
        return res.status(401).json({ err: "bad credentials" });
      }
    });
  } catch (err) {
    return res.status(401).json(err);
  }
}

// GET /api/users/me
// Returns the authenticated user's public profile (password stripped by toJSON).
async function getMe(req, res) {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ err: 'User not found.' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ err: 'Server error.' });
  }
}

// PUT /api/users/me
// Accepts { email, username, password? } — password is only updated when provided.
async function updateMe(req, res) {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ err: 'User not found.' });

    // Update email unconditionally — it's always sent by the form.
    user.email = req.body.email ?? user.email;

    // Only update password when the client actually sent a new one.
    // The pre-save hook handles hashing automatically.
    if (req.body.password && req.body.password.trim() !== '') {
      user.password = req.body.password;
    }

    await user.save();

    // Issue a fresh token so the JWT payload reflects the updated email.
    const token = createJWT(user);
    res.json({ token });
  } catch (err) {
    // Duplicate email — another account already owns it.
    if (err.code === 11000) {
      return res.status(400).json({ err: 'That email is already in use.' });
    }
    res.status(500).json({ err: 'Server error.' });
  }
}

/*----- Helper Functions -----*/

function createJWT(user) {
  return jwt.sign({ user }, SECRET, { expiresIn: "24h" });
}
