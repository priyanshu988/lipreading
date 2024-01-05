const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const Videos = require('../models/video');

//fetching user data
router.get('/fetchUserData', async (req, res) => {
    const { email } = req.query;

    try {
        const user = await User.findOne({ email });
        res.json(user);
        // console.log(email);
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


//fetching Video data
router.get('/fetchVideoData', async (req, res) => {
    const { Level } = req.query;

    try {
        // console.log("level is s"+Level)
        const data = await Videos.find({ "Level": Level });
        res.json(data);
        // console.log(email);
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// Register user
router.post('/register', async (req, res) => {
    try {
        const { email, password, profession, name, dateOfBirth, BeginnerSolved, ExpertSolved, IntermediateSolved } = req.body;
        // console.log("register arrived")
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            email,
            password: hashedPassword,
            profession,
            name,
            RequiredLanguage: "none",
            RequiredLevel: "beginner",
            BeginnerSolved: Array(parseInt(BeginnerSolved, 10)).fill(false),
            ExpertSolved: Array(parseInt(ExpertSolved, 10)).fill(false),
            IntermediateSolved: Array(parseInt(IntermediateSolved, 10)).fill(false),
            BeginnerAttempts: Array(parseInt(BeginnerSolved, 10)).fill(0),
            ExpertAttempts: Array(parseInt(ExpertSolved, 10)).fill(0),
            IntermediateAttempts: Array(parseInt(IntermediateSolved, 10)).fill(0),
            dateOfBirth,
        });
        // console.log("register going to save")
        const savedUser = await newUser.save();
        // console.log("register saved")
        // console.log(savedUser);

    } catch (error) {
        console.log(error, error.message);

    }
});

// Login user
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        // console.log("login arrived");
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        // console.log("login user found");

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid password' });
        }
        // console.log("login pass matched");

        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        // res.status(500).json({ error: error.message });
        console.log(error, error.message);
    }
});

//LEVEL
router.put('/updateLevel', async (req, res) => {
    const { email, level } = req.body;
    console.log("update-level");
    try {
        // Find the user by email and update the data
        const updatedUser = await User.findOneAndUpdate({ email }, { $set: { RequiredLevel: level } }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        return res.json(updatedUser);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

//LANGUAGE
router.put('/updateLang', async (req, res) => {
    const { email, lang } = req.body;

    try {
        // Find the user by email and update the data
        const updatedUser = await User.findOneAndUpdate({ email }, { $set: { RequiredLanguage: lang } }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        return res.json(updatedUser);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

router.put('/updateVideoSolved', async (req, res) => {
    const { level, email, videoNumber } = req.body;

    try {
        if(level === "beginner")
        {
            const result = await User.findOneAndUpdate(
                { email },
                { $set: { [`BeginnerSolved.${parseInt(videoNumber, 10)-1}`]: true } },
                { new: true }
            );
            res.json(result);
        }
        else if(level === "intermediate")
        {
            const result = await User.findOneAndUpdate(
                { email },
                { $set: { [`IntermediateSolved.${parseInt(videoNumber, 10)-1}`]: true } },
                { new: true }
            );
            res.json(result);
        }
        else if(level === "expert")
        {
            const result = await User.findOneAndUpdate(
                { email },
                { $set: { [`ExpertSolved.${parseInt(videoNumber, 10)-1}`]: true } },
                { new: true }
            );
            res.json(result);
        }
        

        
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.put('/updateVideoAttempt', async (req, res) => {
    const { level, email, videoNumber } = req.body;

    try {
        if(level === "beginner")
        {
            const result = await User.findOneAndUpdate(
                { email },
                { $inc: { [`BeginnerAttempts.${parseInt(videoNumber, 10)-1}`]: 1 } },
                { new: true }
            );
            res.json(result);
        }
        else if(level === "intermediate")
        {
            const result = await User.findOneAndUpdate(
                { email },
                { $inc: { [`IntermediateAttempts.${parseInt(videoNumber, 10)-1}`]: 1 } },
                { new: true }
            );
            res.json(result);
        }
        else if(level === "expert")
        {
            const result = await User.findOneAndUpdate(
                { email },
                { $inc: { [`ExpertAttempts.${parseInt(videoNumber, 10)-1}`]: 1 } },
                { new: true }
            );
            res.json(result);
        }
        

        
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});




module.exports = router;
