# The idea; an initial list (Friday, 8 May 2020, 14:44PM)

## The idea

Initially I thought I'd make a game called _COMBATS_ that would be a direct continuation of _PONGS_ and _BREAKSOUT_, with a very broad brief on what the variations might be. But my brain doesn't seem to work with such an unconstrained palette (and it's not impossible I've ever "done" all the obvious takes on a basic arcade game I wanted to take?). Given that I was recently approached to write something for a special issue of a journal on "adaptation in film and videogames", I suppose my mind jumped to adapting films to a specific game, and since _Combat_ was already on my mind, here we are: adapting various movies into the basic framework of Atari's game _Combat_.

Rather that try to totally exhaust the possibilities (by, say, trying to make 36 of them), I think I'll try to put together a package of 10 (like a "top ten") and then can add new sets as with _Chesses_ if it seems relevant.

I think the general principle here is to be reasonable free with the adaptation, including single player versions (maybe even mostly), rather than require simply mechanical changes to the original game's nature. In essence, then, I'm almost talking more about having the tank from _Combat_ "star" in Atari-esque adaptations of famous films?

If I'm framing this from the outset as a research piece, what would I say is interesting about this activity? It continues my more general interest and work on adaptation of many kinds (_Sibilant Snakelikes_, _The Shining_, _Breakout Indies_, _Ancient Greek Punishment_, etc.). In all those cases a major point of interest is in that central tension between source material and destination material, or tenor and vehicle, or what have you. It's a design challenge, but always ends up being about the available mechanics, as well as the (often comedic) relationships between the imagery of the two different parts? A tank in a wig etc.

Plus it just sounds fun.

## An initial list

Should they all be single player? Kind of weird given that COMBAT is two player, but perhaps that's okay? I'm bolding the ones I think could work for now...

- The Shining (going down a hallway, twins appear and elevators spew blood which kills you unless you shoot the twins first?)
- __Citizen Kane__ (tank says Rosebud when you fire, and then you die... some kind of architecture?)
- __Indiana Jones__ (tank running away from a boulder)
- __Star Wars__ (light sabre duel?)
- __The Godfather__ (toll bridge scene)
- Vertigo?
- __2001__ (monolith? Just shoot at it like an angry monkey? Perhaps alongside other tanks)
- Breatheless (new wave cuts?)
- __Au hasard Balthazar__ (just a donkey in the ring instead of another tank?)
- Stalker (something about the zone?)
- __Taxi Driver__ (looking into a mirror? Could deliver the lines if you shoot into the mirror)
- Some Like it Hot (tanks in wigs? Pretty hard to do with the palette...)
- __Blade Runner__ (AI tank that gives the speech when you kill it? While spinning!)
- Burden of Dreams (pushing a boat together?)
- __Godzilla__ (giant tank? You die. You are Gozilla?)
- __THX1138__ (tank in bright white environment with nothing else)
- To Sir With Love (classroom of tanks and you have to shoot every student to get them to behave themselves?)
- Night of the Living Dead (flee zombie tanks into a safe house?)

So I mean, that's ten. I'm almost certain it would be possible to do ten more with more thought, this was largely a list derived from some obvious choices and the BFI 100 list.

So I suppose next is to implement the basic concept of a tank.

# Graphics; speech (Friday, 8 May 2020, 16:07PM)

## Graphics

Have now put together the world's simplest version of a tank moving around with keyboard controls. By no means a difficult thing, but interesting because of the ways in which Phaser's default toolset/nature is kind of inappropriate to the replication of the Atari game. Most obviously the framerate allows for very smooth movement and rotation of a tank sprite, which completely mismatches the original game, which is characteristically jerky. Further, antialiasing and high resolutions mess with the original graphical style, so that had to be turned off.

Current problem is that with antialiasing off, the tank still doesn't rotate in the same way as the Atari tank. This is presumably because either a) the rotation algorithm doesn't match, or b) the Atari version actually uses custom sprites for each rotational position. If I had to take a guess, I might say it's the latter. In which case I'll need to mimic that myself if I want to pursue making something that genuinely looks like the Atari version.

This is all kind of important because I'm (at least for now) trying to make the game in the "proper" (very low) resolution. There's not much room for error here because it's so obvious if a pixel is out of place. This also has huge implications for what I may or may not be able to communicate in the games themselves. Movement and shooting are both very expressive, but with such a small resolution, the complexity of things I can show might be very low. I'm most concerned about text for the moment, as at least a couple of the games might require that.

## Speech

ALTHOUGH, perhaps I could look into some super degraded-sounding audio of a voice instead? I mean, that's not really something the Atari could do though is it? I'll have to consider that. Well I just did a little research and it sounds like the Atari 2600 _could_ do some version of voice stuff! Here's a [discussion of that on Atari Age](https://atariage.com/forums/topic/46941-speech-synthesis-on-vcs/). There's this ROM hack called [Berzerk Voice Enhanced](https://atariage.com/hack_page.php?SystemID=2600&SoftwareHackID=171), which I'm going to assume stays true to the Atari's sound capacity, given the nature of these people. Apparently the game QuadRun was also one that had voice, just announcing the title.

Having listened to the voice: hyper distorted is the main character. Maybe I could work out how to filter a voice/my voice in Audacity to a point where it sounds enough like this? For Rosebud, You Talkin' To Me? Like Tears in Rain.

# Collisions, confusions (Tuesday, 12 May 2020, 16:01PM)

Well I finally got a version of pixel-based collision done, even though it is truly, truly horrible. Truly horrible. Like, I don't know quite how to express how shit it is? Depressing really. The problems all arise because I'm trying to mimick how the Atari works and how Combat works, and those aren't tools readily available to me with something like Phaser. So it's all very stopgap bad solutions I'm not all that happy with.

But then on the other hand I've been really keen to get the game to at least appear relatively similar to the original game so that it's not distractingly _not_ Combat, you know? I'm losing track of the point of that though. To the extent I'm not _actually_ making an Atari game, why am I trying to fake Atari-style elements? And if I'm not making an Atari game, then what am I actually doing and why am I beholden to Atari graphics, Atari collisions, Atari sound design, and so on?

Is the point of this game that it's literally _Combat_, and therefore an Atari take on these things? Or is the point that it's move scene re-expressed using a tank and _Combat_ happens to be an iconic tank game that gives it some kind of grounding? And also provides constraints of other things like graphic and sound and so forth.

I feel a little confused by the project right now. Can you tell?

# Death to tilemaps (Wednesday, 13 May 2020, 11:55AM)

It's not reflected in the codebase because I just discarded all the changes (thanks Git!), but I spent a good (bad) hour trying to use a tilemap as the basis for drawing levels in the game, to no real avail. It's probably some dumb little thing I'm doing, but in the end who cares.

My new plan: draw tiny little levels in Pixen, do pixel collision as with the tanks, and hey presto.

This stuff is SO boring.

It's probably a good data point showing that not every single thing that happens during development is actually of interest or really worth dwelling on. This was just a technical moment that led nowhere.

# Dead ends and questions (Wednesday, 13 May 2020, 14:47PM)

Just discarded a bunch of changes where I tried to make simple image-based collision stuff work and... it didn't. A frustrating time indeed.

So let me ask me some questions then: does it need to be Combat? If so, does it need to be a close match to the Atari style at the level of things like collisions? Rotation?

What would the game be like if the graphics were just literally the standard tank moving around, rotating per the standard approach in Phaser, etc.? And we just went from there. Not totally Atari, but in the spirit of it in terms of basic graphic restrictions and basic mechanics?

Fundamentally: why does pixel perfect collision detection and the like even matter? It fucking doesn't, right? And if it doesn't matter, why not make the game the "easy" way, probably still with a tile-map involved, since that seems like a helpful way to draw scenes, but relying on Phaser's physics and velocities etc.? Try to lean into what the library gives me while making it "enough" like the original game to be a clear tribute.

So that would mean standard collision detection for sure, which would mean applying a more standard velocity to the tank, which might eliminate the jerky style of motion which would be a shame, but probably not the end of the world??? Maybe you can stagger the updating of rendering or something weird?

This all suggests that I should perhaps start a new branch, reimplement the game and see what happens?

OKAY.

# Tiled (Thursday, 14 May 2020, 12:00PM)

OKAY WELL. I did what I said I would do in a new branch this morning and have already merged it feeling fairly successful. We have:

- Atari tank image that rotates as per the game
- Arcade physics movement that does manage to replicate the jerky movement of the tanks by setting a very high drag (can work on this, but nice to see I can have at least a simulacrum)
- Arcade physics collisions, which means it ain't pixel perfect, but at least just works without any extra effort on my behalf
- Tilemap-based level (created in Tiled) with collision working very nicely thanks
- Atari colours applied to the tanks, walls, background

The result is something that ACTUALLY LOOKS LIKE COMBAT, with the one significant difference being a lack of pixel perfect collisions. It's not impossible I could revisit this specific issue, I suppose, but I kiiiind of doubt I'm going to do that, as it's pretty strenuous and it's not THAT clear it's vital to what the game is "about".

So frankly I'm kind of happy. I need the tanks to be able to shoot (each other? with scoring?), now, and then after that I think I can actually look at the titles of films I was thinking of and actually work out how they might fit this frame?

Amazing... maybe I'm actually allowed to start working in a way that doesn't suck?

# The basics (Friday, 15 May 2020, 10:14AM)

Well the basics are in now I think. Shooting now mostly works, including when you shoot and they teleport into a wall (it tunnels out in the same direction) or they go off the scren (it wraps). So I think we've now got a close enough framework to continue with.

Next is some kind of text display, some experiments with producing sound a bit like the Atari voice playback thing, and then also obviously some honest-to-god design of the levels themselves. Phew. At which point we might actually find out whether this even works or not.

# Audiophile (Friday, 15 May 2020, 11:21AM)

Spent some time in both Audacity and LMMS trying to work out some way to make my robot voice as it would potentially just obviate any need for text at all, as I'm not sure about text and matching resolutions. Combat itself doesn't display any text other than numbers, and I'd want to be potentially able to display things like "Rosebud" and "You talkin' to me?" etc. Especially for the longer phrases which help to ground the game in the movie, it would be a talk order potentially to display. I doubt it's impossible (possibly breaking it up or scrolling it?), but I like the idea of at least pursuing an audio version first, especially since actual speech is so important to films (usually - talkies and all that), and because it's funny that the Atari _did_ actually have this capacity in a super limited way.

In the end I couldn't get anything going with various chains of filters (though LMMS was way better for experimentation because of its non-modifying effects stuff making experimentation faster). I found interesting distorted sounds, but non of them really sounded much like the robot-y stripped back sound from Atari. I guess it's not that it sounds like a robot but just insanely "low resolution"?

In searching for tutorials (which mostly focus on echo and multiple samples with different pitches and tempos), I re-ran into the idea of a vocoder, which I didn't use the first time because I had a mono recording (stupid reason, but this is the way it goes when you're hurrying around looking for quick fixes - it takes forever). After all, a vocoder is kind of exactly a version of what I want - a voice encoder. And Kraftwerk used them. So after playing around with the parameters I absolutely don't understand in Audacity's vocoder, I got something that (at least for me saying "Rosebud" in an uninspiring way) did actually seem to produce something kind of nice. I also tried it on the actual audio from Bladerunner's "I've seen things" seen, but in the end that audio was too messy. It's likely that it's worth rerecording these texts with some kind of simple speech synthesis voice, or even me doing a monotone or something.

So this did end up being a productive little session in the end, though it was extremely frustrating for much of the time. I think that, in keeping with the obvious limitations on Atari hardware, it would also make sense to keep audio quite short. So rather than have the entire "I've seen things" speech I'd rather just have the first sentence or something... or that and "time to die" before the death spin? Or not. But anyway, play around with that brevity.

# Design; Other movies?; Materials? (Friday, 22 May 2020, 10:27AM)

Okay well I think I've spent enough time fiddling with the base case of Combat and getting some of the little flourishes that will make this thing seem more or less like close-ish versions of the original game. Now there has to come a moment where I actually think about each of the movies and work out what I'm supposed to do for each one.

## Designing

### Citizen Kane

The idea is to do the rosebud death scene because it's the most iconic (is that my criterion overall? I suppose it needs to be to at least some extent to overcome the potential that the scenes won't be all that recognizable otherwise!). In that scene he's lying down in bed, he whispers "rosebud" and then he dies and drops the glass globe that contains the little scene referring back to his childhood home. ([Here is the relevant clip](https://www.youtube.com/watch?v=BFSjHBVx-xk))

So the two keys here are that, first, the tank should say Rosebud, either with text or, perhaps better, the hyper compressed voice that the Atari seems to have been able to do (and which I seem able to maybe approximate with Audacity's vocoder). And second, the tank should die immediately afterwards, which is represented by the violent spinning from the game. Comedy gold?

How do you trigger that final reminiscents? I suppose you just use the "fire" button (which can double as "action" in some of these games). And I suppose you're stuck in place, so you can't navigate anywhere. How do I convey the idea that you're in bed in your giant mansion? Some kind of primitive mansion drawing with the player's tank at the centre of it?

Do I need to think about the bauble? Could that be represented by shooting out a final bullet as you say rosebud? Or is it best left out because it'd be pretty unclear unless someone knows the movie well enough.

(On a stupid note, could I make the entirety of Citizen Kane out of Combat? Recreate a version of each scene? Probably not.)

### The Godfather

I'm thinking of the tollbooth scene because it's quite a standout in terms of drama. ([Here's a clip of it](https://www.youtube.com/watch?v=sJU2cz9ytPQ).) So he gets caught behind another car (tank?) at the toll area, and then other people (tanks?) emerge and everyone shoots the shit out of his car, and then him as he emerges, including shooting him when he's dead.

It seems obvious I'd have to identify the car and Sonny as one thing, so there wouldn't be the idea of actually getting out. But beyond this the player could drive down a road, get stopped behind another tank (or maybe just stopped by the toll arm? How do I explain that you can't shoot? I guess he doesn't appear to have a gun with him...). Then when you reach the right point, the tank in front rotates and other tanks come out from the edges of the screen, and they all shoot you.

It's part of the scene that Sonny doesn't die immediately, so is the idea that your tank gets buffeted by the bullets at first, and then at some point it dies and spins? And a tank shoots it even then? How difficult is all that choreography going to be? Perhaps with tweens it's not so bad actually?

### 2001: A Space Odyssey

The monolith scene for this one. In essence we can just have our tank and then a bunch of other tanks shooting at a monolith in the centre of the scene? I'm wondering about the colors of the tanks - if the player tank is different to the others, it gives the idea that they're against each other? But actually isn't that what happens anyway now that I think about it? It starts of "peaceful", then the monolith kind of teaches them violence? I mean, it's very appropriate... let me check it out. ([Here's a clip](https://www.youtube.com/watch?v=9woRJ7-mD7Y).) So they wake up in the morning, it's there and they shout at it, they form a ring around it, then a couple touch it, ... and actually no violence erupts! Completely misremembered this scene? They just crowd around it, touch it a bit, and then that's it.

Maybe that's fun though anyway. You're just one tank among many. The monolith is there, and you all kind of bump into it over and over and then at some point the scene ends? But the monolith is also ultimately about giving them the idea of a weapon, so it would be nice to think about some way that it connects to the tanks shooting? Maybe there's a "moment", the monolith disappears, and then you can all shoot? And they can all just shoot each other? Hehe.

### Au Hasard Balthazar

Given that the film is basically just about the fatalistic journey of a donkey, it would make sense to imagine this as Balthazar just showing up in a Combat level? So just a donkey instead of the other tank, and it just stands there not really doing anything. You can shoot it or not (I guess it spins?). How does the scene end if you don't shoot it? Just a timer (like the real game).

### Taxi Driver

I liked the idea that there would be a mirror you could drive your tank in front of, and if you shoot the mirror you'd have the sound effects from the movie? Just "You talkin' to me?" over and over again. That would be all. Does the overall apartment need to be there? Just a mirror? Will it be clear what it is? (To what extent to do many of these end up feeling like just triggering movie quotes?) Again, there's an appropriateness to a tank doing this routine, with its protruding gun and threat of violence? The idea that it's trying to "act tough" in a mirror is quite nice? Would you actually shoot at the mirror, or just trigger the sound? I guess it's just the sound because in the movie he doesn't shoot he just pretends he will, or menaces the reflection person with the gun. While admiring himself. I like the idea of the tank admiring itself. ([Here's a clip](https://www.youtube.com/watch?v=4e9CkhBb18E). There's reference there if I did want the apartment too, but I suspect it might end up just visually confusing...)

### Blade Runner

Well it's more sound stuff right? Ultimately the point is that you shoot the other (replicant) tank and it does the "I've scene things" speech. How can you tell it's dying? Could it give the speech while spinning? Or is it a better payoff if it says "time to die" and then spins? It feels like the spinning indicates that you're dead, not dying, given that at the end of the spin it immediately resets? ([Here's a clip](https://www.youtube.com/watch?v=NoAzpa1x7jU).) In the movie he rescues Harrison in a human act, then sits down and does the speech, then dies. He dies on his own, so there's no obvious reason for you to shoot him? In fact he's in pretty nice shape when he dies.

This could be pretty confusing. I'm not sure how to represent the idea that one tank saves another (especially not from falling in a world with no height). And if it just kicks off with the speech and then he dies (spins), then what is that, really? Perhaps the scene just has too little activity for the player to really work?

### THX1138

I mean, this would literally just be a single player tank in a white world driving around endlessly until the round ends? (This makes me wonder if it makes sense to have a visual timer of the round so that people know it's going to end?) Given the whole "high brow" vibe of the other movies, I kind of wonder with this one fits the mould all that well, but it's a pleasingly iconic scene.

## Other movies?

In current excluding a couple of blockbusters (Indiana Jones, Star Wars), I'm aware my list is a lot shorter now. Especially if Blade Runner doesn't work either. There's also just no real unifying thematic across all the little scenes. Which I don't think has to matter, it could just be the project to make whatever seems fun - but it could also be plausible to pick scenes about death and violence (which are the two things that Combat is basically about) in order to highlight those elements and their lack of subtlety?

Some other thoughts (without thinking hard about what would be the content of the game)
- Tokyo Story (two tanks... doing something? Just looking at the scenery?)
- Vertigo (going up the spiraling staris?)
- The Searchers (I haven't seen it, but it's such a fit I wonder if there's a chance to include some scene that's unlikely?)
- The Passion of Joan of Arc (take as sacrificial victim, in black and white, tight close-up?)
- Breathless (maybe driving along with another tank following/side-by-side and little cuts?)
- L'Avventura (maybe driving around an island shape unable to find your opponent?)
- Rashomon (four cameras, with different effects/orientations on them?)
- Some Like It Hot (two pink tanks? ha ha?)

The key is that I think it's interesting to represent unlikely movies (and perhaps for that reason looking at classic "great movies" is good because they give us a canon) specifically because of the awkward fit. It can't be the case, though, that every time the punchline is just "oh x shot y" or similar. It needs to leverage different parts of Combat (movement, spinning, voice, walls, shooting) and ideally even reveal something in the game or make available some element that's not usually there.

## Materials?

- Non-player tanks (as in some number of tanks and their behaviours)
- New sprites (should probably keep somewhat to a minimum (e.g. Balthazar)
- Level design (the shapes drawn with the simple wall tiles, including invisible tiles)
- Tank colors
- Voices and sound effects (though should be sparing?)
- Text possibly
- Movement (including parameters like speed etc.? Best not to tamper too much)
- Shooting / perform action (can have custom actions like speaking, but again not too much)
