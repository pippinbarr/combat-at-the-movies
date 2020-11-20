# Combat (as in, the base)

- ~~Get basic tanks up and moving~~
- ~~Get a level working with collision etc.~~
- ~~Get basic shooting with collision working~~
- ~~Add teleportation effect on being hit (seem to just teleport a distance in the direction of the bullet's trajectory roughly speaking? Maybe with some random angle added?)~~
- ~~Pause the shooting tank on hitting the enemy (until it stops spinning)~~
- ~~Deal with teleporting into a wall?~~
- ~~__POINTLESS__ Add controls to the other tank so it's actually two player? Or is this pointless because that won't actually happen ever in the game?~~
- ~~__I DID AND I DID__ Do I really need to implement this level of detail of Combat if I'm not making Combat?~~
- ~~Basic sounds (movement, shooting, death)~~
- ~~Basic AI tank~~
- ~~Add some score stuff by default~~
- ~~Better AI tank? Maybe only as in: it tries not to just ram walls indefinitely?~~
- ~~Improve sounds~~

- Expiry of bullet by distance/time?

# Menu

- ~~Create a basic menu so you can at least load different levels for testing stuff out~~
- ~~__IT LOOKS LIKE ATARI INSTRUCTIONS__ Make an actually good menu (what does a good menu look like?)~~
- ~~Maybe move to a menu where you select with a cursor instead of letters because they're pretty gross-looking?~~
- ~~__YES__ Could it look like an Atari instruction booklet?~~

# Meta

- ~~__NO__ Contemplate two-player idea for all games? Player 2 as sled? Player 2 as missing woman? Player 2 as Balthazar?~~
- ~~__IT IS THE WAY TO GO__ Try out more detailed instructions (they could potentially even look like Atari style instructions?)~~
- ~~Escape should go back to the menu~~
- ~~Add all new instruction styles~~
- ~~Add side-by-side images as figures for the instructions to fill out the window and add some visual information (especially for people who haven't seen the films, but also as comedy for those who have)~~
- ~~Muting problems (SFX carrying over (like tank sfx))~~
- ~~Remove final title things as incompatible with the new version of instructions etc.?~~
- ~~Add more explicit driving instructions somewhere (either main screen or per game)~~
- ~~Move images into the atlas and compress?~~
- ~~Do a "points pass" to see where points can be used expressively and when they should not even be indicated~~
- ~~__GENIUS__ In case I don't check below: REMOVE THE PLAYER TANK in The Conversation, it does nothing, and it breaks the sprite limit~~
- ~~__TOKYO STORY FOR NOW__ Decide about removing Some Like It Hot and find a replacement (ugh)~~
- ~~Get basic palette cycle thing working~~
- ~~Palette swapping: (https://en.wikipedia.org/wiki/List_of_video_game_console_palettes#Atari)~~
- ~~Implement standard timer ending: flashing score (warning) followed by complete freeze (no audio) with palette swapping of everything on the screen, then return to menu on a timer~~
- ~~Stop all audio at end of a game~~

- Maybe distinguish playing from gameOver to handle that interstitial moment?
- Tweak audio files to make them at least a bit easier to hear (but not too easy!)
- Catch special cases with different named sprites etc. to add to the cycle
- Decide on how nicely you'll implement the cycle in terms of timing and which things change color when
- Check all endings make (some) sense across all games
- General bugs associated with endings (esp. playing boolean where you end up with player able to move/not move or the enemy not spinning or sounds playing, etc. Messy.)
- Make a splash/title screen (probably Citizen Kane poster image on top of a similar? painting of a tank)

# Tokyo Story (Alone)

- ~~Player tank alone on the standard map~~
- ~~Timer ends it (no death)~~
- ~~Slow down the player tank to indicate age?~~
- ~~__NAH, FEELS LIKE IT WOULD BE TOO IMMEDIATE AND THUS COUNT AGAINST THE IDEA OF A LONG HISTORY TOGETH__ Could consider a wife tank beside you initially that death spins and vanishes, leaving you alone~~
- ~~Create figure (ideally a picture of the guy alone?)~~
- ~~Instructions are all about resignation to loneliness after the death of your wife~~

# Citizen Kane (Rosebud)

- ~~Get basic version working (tank dies on shooting, castle)~~
- ~~Add a timer (you failed to remember?)~~
- ~~1 POINT for Rosebud~~
- ~~Draw the castle from the movie "properly"~~
- ~~Endings: YOU REMEMBERED, YOU DIDN'T REMEMBER~~
- ~~Instruction: REMEMBER~~
- ~~__FULL MOTION OF TOSSING AND TURNING HA HA__ Wiggling as Kane tank for some more agency?~~
- ~~__IT'S FINE?__ Better audio?~~
- ~~Restore the idea that time runs out and you die, rather than hitting shoot to die~~
- ~~BUG: On loading a second time can't say Rosebud~~
- ~~Allow multiple Rosebuds~~

# L'Avventura (Island)

- ~~Create the island and put the tank on it~~
- ~~Add a timer for ending~~
- ~~__NO__ Add calling out her name for shooting (could even keep the bullet?)~~
- ~~__NO__ Bullet could be the word ANNA?~~
- ~~__YEAH__ Or perhaps no shooting no calling? The instruction kind of does the work here? (Only do the audio if I'm wanting to reference Heavy Rain?)~~
- ~~Instruction: FIND ANNA~~
- ~~Ending: YOU DIDN'T FIND ANNA~~
- ~~__BUT NO__ Add a Claudia tank??? Funny...~~

# The Godfather (Tollbridge)

- ~~Create basic scene~~
- ~~Enemy tanks at the toll area that shoot you~~
- ~~__YES THIS SEEMS MORE LEGITIMATE TO THE HARDWARE RESTRICTION?__ Reduce to a single tank surprise-killing you since we might like to keep to the Atari sprite limit?~~
- ~~Add a timer for an ending~~
- ~~Instruction: PASS THROUGH THE TOLL STATION~~
- ~~Time ending: YOU DIDN'T GO THROUGH THE TOLL STATION~~
- ~~__BARZINI__ Death ending: YOU WERE MURDERED BY THE X GANG?~~

# 2001: A Space Odyssey (Monolith)

- ~~Basic scene with a monolith available~~
- ~~__NO__ Add a whole bunch of tanks that randomly move?~~
- ~~Player and other tank in empty screen~~
- ~~Monolith appears after a delay~~
- ~~Player touches monolith then it disappears and player can shoot~~
- ~~Player can't get stuck behind the monolith~~
- ~~Player shoots opponent and that's all she wrote~~
- ~~Instruction: EVOLVE~~
- ~~__YOU EVOLVED__ Winning: something...?~~
- ~~__YOU DIDN'T EVOLVE__ Timeout: should that happen? YOU DIDN'T TOUCH THE MONOLITH? YOU DIDN'T WIN AT EVOLUTION???~~
- ~~__INVISIBLE IN THE END, METAPHOR METAPHOR__ Visible dividing line as the river? (Collides for enemy tank?)~~
- ~~Make AI tank stay on its side (see previous)~~
- ~~Sound for non-firing (maybe just a click?)~~
- ~~Music pre-monolith to announce its arrival?~~
- ~~Make the monolith a standard sprite, jesus christ.~~
- ~~Work on opening instruction as it's too confusing~~

# Au Hasard Balthazar (Donkey)

- ~~Draw the rotations frame by frame~~
- ~~Fix the broken walls~~
- ~~Make Balthazar wander around~~
- ~~Timer~~
- ~~__BALTHAZAR IS JUST A DONKEY__ Instruction: Ummmm~~
- ~~Kill Balthazar ending: YOU KILLED BALTHAZAR~~
- ~~__LIFE GOES ON__ Timer ending: ?~~
- ~~__NOT REALLY VERY MEANINGFUL?__ Alter movement code to use pure random movement?~~
- ~~__PART OF A LARGER ISSUE I NEED TO LOOK AT__ Improve instructions and timer endings?~~
- ~~Change Balthazar to not go upside down?~~
- ~~Balthazar started upside down!~~
- ~~Balthazar doesn't spin on death (because of the special orientation thing)~~
- ~~Make Balthazar die on a timer (per the movie)~~

# Rashomon

- ~~Create basic idea of four cameras looking at the same scene~~
- ~~Point cameras at different locations~~
- ~~Give cameras different ignores~~
- ~~Do we need dividers between the cameras so it's more obvious?~~
- ~~Add an enemy tank (does it need an AI? Yes.)~~
- ~~__NO THIS IS OVERKILL__ Give cameras different background colors? Tints? Other perceptual differences?~~
- ~~__IT'S FUNNIER IF IT'S THE ICONIC COMBAT LEVEL__ Consider what the tiles need to look like to recreate the basic murder scene (or rather at least one of them)~~
- ~~Add shooting for AI Tank~~
- ~~Instruction: FIGHT?~~
- ~~Lose ending: ...~~
- ~~Win ending: ...~~
- ~~__NO__ Time ending: ...~~
- ~~__EXACTLY__ Endings could all be ambiguous? WAIT THAT'S NOT WHAT HAPPENED?~~

# Taxi Driver (Mirror)

- ~~Implement "you talkin to me" on shoot at mirror tank (invisible bullet?)~~
- ~~Point per you talkin to me~~
- ~~Timer for ending?~~
- ~~Instruction: PREPARE YOURSELF~~
- ~~Ending: YOU'RE READY (or maybe not if you have 0 points?)~~
- ~~Mirror tank facing a funny direction?~~
- ~~Point awarded without pressing space? (when screenshotting)~~
- ~~__DONE__ Should I restrict when you can say the words? Could it literally be as "simple" as making it a bullet-based thing? Or should I restrict to being in the mirror zone? Or that plus facing the mirror?~~

# Some Like It Hot (Pink Tanks)

- ~~Pink tanks~~
- ~~Enemy AI? Or not?~~
- ~~Shooting and winning etc. Just standard combat actually~~
- ~~HIJINKS ENSUE__ Instruction: BE A WOMAN~~
- ~~Some bugs in there with the game not always ending on death (of player?)~~
- ~~__I THOUGHT WE WERE FRIENDS... Endings: ??? This is a challenge~~

# Beau Travail

- ~~__THAT SEEMS DISTRACTING__ Particle effects from the tank's gun as a cigarette? or not that important and potentially distracting~~
- ~~Basic scene~~
- ~~Mirror tank behind the mirror (same as for Taxi Driver - and interesting that there's that correspondence between the movies and then the games)~~
- ~~Create second layer that can alternate for a disco feel?~~
- ~~Let the tank reverse for this one instance?~~
- ~~Add a music loop (MIDI? Sample?)~~
- ~~DANCE / THE CREDITS ROLL~~
- ~~__TOO DISTRACTING I THINK__ Maybe speed up/slow down the rate of movement as with his dancing?~~
- ~~Look into music maintenance (it might keep playing?)~~
- ~~Mirror tank starts in off direction?~~
- ~~Should start facing away (as per movie)~~
- ~~__FOR NOW WILL "SOLVE" WITH STANDARD COMBAT ENDING__ Need some signification of the ending~~
- ~~Work with text to avoid certainty he's dead?~~

# The Conversation

- ~~I suppose at least set up a level with two AI tanks to create the audio and see what it sounds like completely without graphics.~~
- ~~__THIS IS WORKING I THINK WITH A TANK OUTSIDE THE GAME AREA BOUNDS__ Think about whether there's a way to make a Gene Hackman tank and what that would look like - don't seem to have a reference for what him listening in the hotel room looks like~~
- ~~__NO, IT'S TOO SPECIFIC AND DOESN'T GEL, BETTER IF IT'S MORE CONCEPTUALLY ABOUT LISTENING TO A COMBAT MATCH__ Starting approximation might just be the hotel room and the sound from the next room playing?~~
- ~~__SOLVED BY HAVING IT BE A STANDARD COMBAT ARENA__ A problem: in the film he doesn't hear the murder, he sees it through the frosted/obscure window~~
- ~~__YES! AND THIS WORKS WELL WITH THE INVISIBLE TANK VARIANTS__ Tank could be at the top of the screen outside the play area which is occluded???~~
- ~~__PRETTY MUCH__ In the movie it's a murder in the hotel room, so you could have audio of movement for a while and eventually a shot and a death sound~~
- ~~LISTEN THROUGH THE WALL~~
- ~~__MURDER!__ WHO KILLED WHO?~~
- ~~__SO NO__ Should the play area be filled in so you can't see an implied space? (But that's not how Combat works with invisible mode...)~~
- ~~__YUP, AND FIXED__ Tank audio carries on (probably across all games)~~

---

# ~~La Jetée~~

- Basic scenario of the pier, the player, an enemy tank shooting another tank with the player looking on, and maybe a reprise except this time you are the tank being shot?
- Or a version where you control both the on-looker tank and the tank being pursued and shot? (Maybe a baby-size tank?)
- __YES__ Is this one too complicated to live?
- Maybe it's simpler to have a first scene where you're observing a tank shoot another tank, and then a second scene where you're the tank being shot? (They wouldn't be identical scenes of course, which is bad for time travel.)
