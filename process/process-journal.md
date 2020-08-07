# The idea; an initial list (Friday, 8 May 2020, 14:44PM)

## The idea

Initially I thought I'd make a game called _COMBATS_ that would be a direct continuation of _PONGS_ and _BREAKSOUT_, with a very broad brief on what the variations might be. But my brain doesn't seem to work with such an unconstrained palette (and it's not impossible I've already "done" all the obvious takes on a basic arcade game I wanted to take?). Given that I was recently approached to write something for a special issue of a journal on "adaptation in film and videogames", I suppose my mind jumped to adapting films to a specific game, and since _Combat_ was already on my mind, here we are: adapting various movies into the basic framework of Atari's game _Combat_.

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
- Breathless (new wave cuts?)
- __Au hasard Balthazar__ (just a donkey in the ring instead of another tank?)
- Stalker (something about the zone?)
- __Taxi Driver__ (looking into a mirror? Could deliver the lines if you shoot into the mirror)
- Some Like it Hot (tanks in wigs? Pretty hard to do with the palette...)
- __Blade Runner__ (AI tank that gives the speech when you kill it? While spinning!)
- Burden of Dreams (pushing a boat together?)
- __Godzilla__ (giant tank? You die. You are Godzilla?)
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

Well the basics are in now I think. Shooting now mostly works, including when you shoot and they teleport into a wall (it tunnels out in the same direction) or they go off the screen (it wraps). So I think we've now got a close enough framework to continue with.

Next is some kind of text display, some experiments with producing sound a bit like the Atari voice playback thing, and then also obviously some honest-to-god design of the levels themselves. Phew. At which point we might actually find out whether this even works or not.

# Audiophile (Friday, 15 May 2020, 11:21AM)

Spent some time in both Audacity and LMMS trying to work out some way to make my robot voice as it would potentially just obviate any need for text at all, as I'm not sure about text and matching resolutions. Combat itself doesn't display any text other than numbers, and I'd want to be potentially able to display things like "Rosebud" and "You talkin' to me?" etc. Especially for the longer phrases which help to ground the game in the movie, it would be a tall order potentially to display. I doubt it's impossible (possibly breaking it up or scrolling it?), but I like the idea of at least pursuing an audio version first, especially since actual speech is so important to films (usually - talkies and all that), and because it's funny that the Atari _did_ actually have this capacity in a super limited way.

In the end I couldn't get anything going with various chains of filters (though LMMS was way better for experimentation because of its non-modifying effects stuff making experimentation faster). I found interesting distorted sounds, but non of them really sounded much like the robot-y stripped back sound from Atari. I guess it's not that it sounds like a robot but just insanely "low resolution"?

In searching for tutorials (which mostly focus on echo and multiple samples with different pitches and tempos), I re-ran into the idea of a vocoder, which I didn't use the first time because I had a mono recording (stupid reason, but this is the way it goes when you're hurrying around looking for quick fixes - it takes forever). After all, a vocoder is kind of exactly a version of what I want - a voice encoder. And Kraftwerk used them. So after playing around with the parameters I absolutely don't understand in Audacity's vocoder, I got something that (at least for me saying "Rosebud" in an uninspiring way) did actually seem to produce something kind of nice. I also tried it on the actual audio from Bladerunner's "I've seen things" seen, but in the end that audio was too messy. It's likely that it's worth rerecording these texts with some kind of simple speech synthesis voice, or even me doing a monotone or something.

So this did end up being a productive little session in the end, though it was extremely frustrating for much of the time. I think that, in keeping with the obvious limitations on Atari hardware, it would also make sense to keep audio quite short. So rather than have the entire "I've seen things" speech I'd rather just have the first sentence or something... or that and "time to die" before the death spin? Or not. But anyway, play around with that brevity.

# Design; Other movies?; Materials? (Friday, 22 May 2020, 10:27AM)

Okay well I think I've spent enough time fiddling with the base case of Combat and getting some of the little flourishes that will make this thing seem more or less like close-ish versions of the original game. Now there has to come a moment where I actually think about each of the movies and work out what I'm supposed to do for each one.

## Designing

### Citizen Kane

The idea is to do the rosebud death scene because it's the most iconic (is that my criterion overall? I suppose it needs to be to at least some extent to overcome the potential that the scenes won't be all that recognizable otherwise!). In that scene he's lying down in bed, he whispers "rosebud" and then he dies and drops the glass globe that contains the little scene referring back to his childhood home. ([Here is the relevant clip](https://www.youtube.com/watch?v=BFSjHBVx-xk))

So the two keys here are that, first, the tank should say Rosebud, either with text or, perhaps better, the hyper compressed voice that the Atari seems to have been able to do (and which I seem able to maybe approximate with Audacity's vocoder). And second, the tank should die immediately afterwards, which is represented by the violent spinning from the game. Comedy gold?

How do you trigger that final reminiscence? I suppose you just use the "fire" button (which can double as "action" in some of these games). And I suppose you're stuck in place, so you can't navigate anywhere. How do I convey the idea that you're in bed in your giant mansion? Some kind of primitive mansion drawing with the player's tank at the centre of it?

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
- The Passion of Joan of Arc (tank as sacrificial victim, in black and white, tight close-up?)
- Breathless (maybe driving along with another tank following/side-by-side and little cuts?)
- L'Avventura (maybe driving around an island shape unable to find your opponent?)
- Rashomon (four cameras, with different effects/orientations on them? Different invisible things?)
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

---

# Looking at the design and development work so far (Friday, 5 June 2020, 13:40PM)

Having now actually made a bit of headway into the game I can probably actually say a few things about what it's been like and what I think might be interesting about the process.

I've now put together versions of Citizen Kane, L'Avventura, Rashomon, and Au Hasard Balthazar. I'd originally been assuming that the majority of the work would be about the specific relationship between a tank and its actions and the potential of the scene, and that has been important, but it's been nice to run into other elements as well.

## Citizen Kane

This has generally been the one I've had the clearest bead on from the beginning, though I'm not too sure it's the "best" of the ideas. It's just punchy and amusing. It does leverage the core idea of death so central to Combat, and in particular the visual and audio representations of death (most compellingly the spinning). I think there's something to the idea that you press your shooting button to die instead of to kill, though I don't know that it makes sense in the context of Citizen Kane to say that he chose to die in that moment?

An alternative would be to say that the objective of this game is to say Rosebud before you die? To "realize" or recall the importance of Rosebud before death takes you? In which case I would just have a timer runner (visible or not?) and if you hit the action button you say Rosebud and then die, perhaps you get one point for saying it.

I actually quite enjoy the bullet that is fired by the Kane Tank flying off screen as it genuinely does end up mirroring the bauble/globe from the movie for me. It's a little thing, but I think it's fun that there's that correspondence, and it does make me think a bit about the underlying Atari implementation of the missiles and how the missile sprite is used for different purposes in different Atari games (the ball, the bullet, something I can't remember in Adventure, etc.).

So anyway maybe I rethink the timer idea - since a timer is part of the original game, and it perhaps gets more accurately at the idea of death taking you when it will. Would it be funny/fun if you could say "rosebud" multiple times and kind of build up points with that growing force of memory? Perhaps so.

I do think even in this ultra simple idea there's something to it.

## L'Avventura

This was a latecomer to the thoughts, spurred on by wanting something more like a "great movies" list rather than just "movies I can think of". I also think it's good to maintain some consistency in the list so I could make other games looking at specific genres or more popular movies and so forth.

The core point in L'Avventura is that the guy is searching for the missing woman fruitlessly. It's actually been a long while since I saw it (and perhaps I should rewatch), but I think the central representation of the tank on an island looking around is solid. The timer would be present here again (and perhaps it needs to always be present really, given it's a major part of how Combat works), to signify the end of the search.

I'm starting to wonder whether I need little titles at the end of the game telling you the outcome beyond just the points total. "You didn't find her" or similar. Which is what would always happen.

I contemplated having an invisible and unfindable tank also on the island, but I don't think that really makes sense.

I think there's a decent poignancy to the idea of one Combat tank looking for another, presumably to fight to the death (perhaps mirroring things about the relationship in L'Avventura? Does he even want to find her, really?). As an image I think it's a pretty strong one on loneliness, futility, nobody to kill, and so on. Just realizing it probably does make sense for the tank to be able to shoot, a way to express frustration? Reaching out?

I guess you'd never score any points.

Should these things also have titles at the beginning telling you what you're meant to actually do? (I mean, Atari games wouldn't normally print instructions to the screen would they? I'll have to check up on that a bit. I do like the idea of producing a proper little manual, but it might be overkill and too much work for little old me?)

## Rashomon

Here's an example of one that ended up being as much about the API of Phaser as Combat itself. I think this is a fairly "obvious" idea in terms of representing multiple versions of the same story by having multiple cameras simultaneously. It would have been possible, too, to present four separate minigames, each of which would present the idea of combat in a slightly different way, but I think that the four cameras probably does a better job or being a bit confusing, showing the idea of perspectives and so on. I like that this enabled me to recognize that Combat itself essentially has this idea of multiple "perspectives" in that it presents multiple game modes you can cycle through. I've leaned on the idea of differing kinds of visibility in particular (walls, tanks) to that end. It would be harder (maybe vaguely impossible) to create the same kinds of mechanical differences (e.g. bending bullets or not, bouncing bullets or not) based on the camera.

In the end this should probably be a relatively playable game, reminding me of Bernie's game I can't remember the name of right now (the platformer with the jumbled up views). I'll need an AI tank I suppose, to make this fun, but I can probably get away with largely random behaviour as it's not really the point (I suppose I could make it two player, but then it raises the question of the various other one player versions. Does one player get to be the sled? The nurse? in Citizen Kane? The missing woman in L'Avventura? Maybe.)

It's appropriate that Rashomon is about an act of violence obviously, perhaps it could be too on the nose, but it's fun to draw a multi-camera tank game into comparison with one of the greatest movies ever made etc. etc.

## Au Hasard Balthazar

Bit of a one-liner, but actually one with some teeth I think. You simply have Balthazar the donkey there instead of another tank. If two player then I suppose the other player controls the donkey, if not then I think it's the player as tank and the donkey maybe just wanders around or stays put. You could shoot the donkey (if you're a prick) but you wouldn't get points for that (or for anything? Random points for the "au hasard"?). I think there's something good about pitting the tank against the donkey (or the potential for it to be "against" anyway). It has pathos, it's that classic story of "choosing not to shoot" that videogames leverage from time to time. I like the idea that it could be peaceful.

## So far

Well I think it's going slowly, but perhaps a little better than anticipated. I'm finding relationships between Combat and movies. Yadda yadda (lost the thread on this because I wrote the majority of this entry while waiting for my emergency passport, and now it's the next day and things have been full on). So whatever it says above, let's say that's what I have to say.

---

# Hi; my evil twin (Monday, 29 June 2020, 17:14PM)

## Hi

Been a while obviously. Quite a lot has been going on in our lives in the last few weeks, notably emergency travel to Aotearoa, 14 days in managed isolation at the Auckland Novotel, and then family time in Wellington.

I'm finding it pretty hard to get back in the saddle to be honest, but I've at least chipped away a bit and got a couple of small pieces put in place, including a very basic Taxi Driver with a mirror.

## My evil twin

One somewhat interesting thing about the mirror is that I wasn't able to just create a mirroring camera (the flipY property of the camera in Phaser didn't appear to do anything), and that meant I had to create an actual second tank that mirrors the movements of the player's tank, and then train a different camera on that tank to create the appearance of a mirror.

In one way it's disappointing because it's not a proper mirror, arguably, or at least the metaphor doesn't extend down into the engine itself. On the other hand, having the other tank "really there" gels with the traditional structure of Combat having two tanks (and frankly of the Atari having its memory organized that way etc.), and in this case is especially apt as the scene literally is him pretending to face off against an imagined enemy. So there's something there which I do find pleasing in the end, beyond the base level idea that there's something fun about seeing a tank threatening itself in the mirror without actually doing anything about it...

---

# Where are we now?; 2001 thoughts (Thursday, 2 July 2020, 12:00PM)

## Where are we now?

So I have eight movies in different states of completion and satisfaction:

- _Citizen Kane_ basically makes sense to me in terms of the mechanics of it (say Rosebud and die). It has a nice reversal of the shooting mechanic (maybe I could even have the bullet fired by the tank kill it by overriding the default shoot() function for some underlying cuteness). It's pretty basic obviously, but a lot of them are and I'm not trying for heartbreaking works of staggering genius right? The main thing I think I should watch out for is not having too much exact repetition - each one should ideally not just represent a different movie but a different idea within the confines of Combat. I wonder if there could be something more intentional here, or if the player will even understand what happened because it'll be so sudden? But we'll try it out on some people.
  - Possible instruction: REMEMBER
  - Possible end text: YOU DIED
- _L'Avventura_ works well but needs the timer to end it as there's no actual way to do anything. It occurs to me now that the fire button could have the sound effect of calling the woman's name (Anna). That reminds me of that sequence in Heavy Rain where you lose the kid for a bit ("Jason! Jason? Jason! Jason?! Jason!"), which is a nice call-across (for me). This one uses the basic mechanic of navigation. It might be strengthened if you received an instruction.
  - Possible instruction: FIND ANNA
  - Possible end text: YOU DIDN'T FIND ANNA
- _Rashomon_ works in terms of the base concept, with the specific mechanic using multiple cameras in Phaser to represent the classical multiple viewpoints of the original movie, including differences in perception between cameras (they are literally able to see some things and not others). The combat of two tanks also reflects the core conflict in the movie too, so that all works well. It needs either AI or a two-player mode for it to fully function (I suppose a bad AI will work okay).
  - Possible instruction: FIGHT
  - Possible end text: (Overlaid texts with different interpretations? Randomized? Vague? WHAT HAPPENED?)
- _Some Like It Hot_ is pretty stupid, probably the closest to a complete throw away gag in the set, but that makes it seem kind of reasonable? Will people get it? I mean, will they get any of it really for that matter. I find myself wondering if the two tanks ought to be fighting each other, or just running away from a different set of tanks? But I think that's too confusing, I think there's a purity to the pink tanks that gets at the dumbness of the two men dressing as women? Or is it TOO DUMB???
  - Possible instruction: What? BE A WOMAN?
  - Possible end text: What? Barely makes sense... hmmm..
- _Taxi Driver_ works only to the extent that there's a functional "mirror". As I've said before, I think I like that the mirror image is actually another tank called "enemy" in the code itself. That at least partly gets at the imagination on display in the movie scene, where he pictures his own reflection as the person he's threatening (though also loses the idea that he's threatening himself at some level too of course, which is less ideal, and less authentic to the film). Clearly a tank is a great vehicle for this movie with its built-in gun, and the idea of a tank threatening itself in a mirror and never firing is quite a pleasing one in the context of videogame violence.
  - Possible instruction: YOU TALKIN' TO ME?
  - Possible end text: YOU DIDN'T SEE ANYONE ELSE HERE (or something like that? YOU'RE READY?)
- _The Godfather_ is pretty functional. The toll road scene is perhaps a little less famous than some other scenes in the film which vaguely concerns me, but it also just leap to mind as the most violent sequence in the picture and thus fits the tank model well. The other good thing is that the protagonist in the scene (Sonny) is helpless and is murdered, which is not so common in games. So the mechanical thing here is being shot mercilessly by an overwhelming opposition in a very unfair way, which is good. I mean it's not "good", but it works well I think, and is distinct.
  - Possible instruction: DRIVE THROUGH THE TOLL
  - Possible end text: YOU DIED? THEY GOT YOU?
- _2001: A Space Odyssey_ is not very far advanced beyond the imagery, but the imagery itself looks really nice? The fact that the monolith is black despite that not being in the official palette makes it stand out quite well indeed. I'm not 100% on the remaining design work, but it seems like to reflect the movie it would have to be: multiple tanks drive around (including the player) but can't shoot, the monolith appears for a while, then disappears, then the tanks can shoot and massacre each other (or per the movie and book, a different set of tanks?). There are a bunch of questions to explore here.
  - Possible instruction: Well they're just a bunch of apes... SURVIVE?
  - Possible end text: Something from the book/movie? What is the point here, that violence takes over? That combat becomes asymmetric?

Phew, that's a lot. So it's clear I need to think through 2001 further, but for the rest I think we're quite far advanced?

## 2001 thoughts

Looking at the movie summary of the appropriate sequence:

> In the prehistoric African veldt, a tribe of hominids are driven away from their water hole by a rival tribe. Later, they awaken to find an alien monolith has appeared before them. Seemingly influenced by the monolith, they discover how to use a bone as a weapon and return to drive their rivals away.

So a plausible setup is that we have the player's tanks on one side of the screen (matching colours), or even just the player alone, and then the enemy tanks on the other side guarding a watering hole? If I want to be that literal? I mean that at least gets at the idea that one side dominates the other prior to the monolith?

Then the monolith appears and afterwards the player side (either them alone or all their cronies) gain the ability to shoot and thus kill the enemy? This works with or without the watering hole obviously. Could develop a level where a single enemy tank blocks some specific way out or a clearly valuable zone (watering hole doesn't make sense, but maybe there's some kind of symbol of a flag or a coin or something?). Then the monolith comes, the player approach is (they would have to touch it I think), gains the ability to shoot, kills the enemy tank, and takes the flag?

In which case it could say CAPTURE THE FLAG at the start, which is semi-classic combat style play (if not Atari Combat play), and you can't accomplish it until the monolith grants you the ability to use your weapon.

Although I think it would be visually fun to have multiple tanks all wandering around like apes, it's not super practical for me to implement, and may not actually be more effective conceptually that sticking with the Atari two tank thing (not to mention that it's kind of bullshit to have more than one tank in the Atari context - which throws The Godfather a bit into question too... should it just be one tank that blindsides you in fact?)

Okay I think that's the "correct direction" for right now.

---

# Two more needed! (Monday, 6 July 2020, 13:41PM)

I still need two more films to have a kind of "top ten" list vibe, which makes the most sense for films I think? I've been looking through the BFI top 100 list...

So...

- _La Jetée_ is an interesting possibility. The film style of still images could be quite an interesting idea, could just massively slow it down perhaps? I wonder if you could control two tanks at the same time, a little one (the child on the jetee) and a larger one which is chased and killed on the jetee? I think it could be would worth trying at least? Black and white palette too.
- _Blade Runner_ some version of the Voight-Kampff test would be quite interesting? How would that work in the context of combat though? One tank testing another tank? It feels a bit like it might be quite static? Think this may not work.
- _Beau Travail_'s classic dancing scene at the end could be amazing? A dancing tank...
- _The French Connection_ could just be the sound of the game without the game? Monitoring it with some kind of animation? Or just your tank sitting in a room listening? How would you show what is happening? I quite like it in principle... LISTEN

So if I'm picking the ones to pursue it's _La Jetée_, _Beau Travail_ and _The French Connection_, all of which have kind of potentially interesting ways of engaging with the original mechanics (duplication, dancing, and listening respectively). I guess I just try making all of them and see where it leads me.

---

# Shooters (Wednesday, 8 July 2020, 15:11PM)

Just popping for a very small note that popped into my head while working on Beau Travail, which is the frequency with which I'm finding myself overriding the `shoot()` function so that it doesn't do anything, essentially disarming the tanks. This is true in at least three of the games/films, and in all the other cases the act of shooting tends to be significant if taken (perhaps with the weird exception of Some Like It Hot, which comes across more as a gag about the movie than a representation of the movie or a scene from it).

---

# Return of the guy (Tuesday, 28 July 2020, 14:46PM)

I'm scrambling back into this saddle. Importantly, I've decided to make this game and its ideas the subject of a journal paper for /arts/ and a grant application, meaning I need to get my head back into it, feel like it's a good idea again, and generally improve and think about What It All Means.

Probably the best way to do this is to restate my intentions, which I can probably do in the _why_ document, and to just get some more work done on the damn thing.

---

# Citizen Kaned (Tuesday, 28 July 2020, 15:58PM)

Mostly anyway.

It was good to actually work specifically on making a scene come together rather than my recent focus on the AI Tank which was boring and dissatisfying because writing a bad AI is just not a fun activity I suspect. Working on Citizen Kane made me think a bit more about a few things, which helps, and here are something I did/thought

__Redrew the symbolic castle__ I had with a sort of loose attempt at the "actual" Xanadu from the movie. I was initially concerned about the resolution of the tilemap in combination with the complexity of Xanadu, but in the end I think it perhaps works out, looking like a sprawling structure of some kind, and it's not inaccurate to the movie. A key here is that question of whether you're going for the spirit (in which case a symbolic castle is fine) or the actual thing (in which case it's "important" to have the proper castle represented, albeit within the confines of the tilemap's resolution and color palette). Both options have their merits and I think it's interesting that in the end I was able to (more or less subconsciously) split the movies about 50/50 between authentic and spirit. Both are worthwhile experimental modes. Funny that it comes up everywhere, from the overall design approach to the visual aesthetics and so forth.

__Added point scoring when you remember Rosebud (by shooting)__. Now you shoot, it "fires off the memory" (ha ha!) and you say "Rooooosssseeebuuuuud" and then get a point for remembering. I guess that's justifiable if only in that you accurately recreated the scene, but perhaps there's also a kind of victory for Kane-tank himself in remembering? The mechanical fact of scoring a point is one of the few things we can leverage out of the Combat set of rules and representations, so it's nice to use it wherever possible.

__Added instruction screens with text__. Added that to the whole game of course, but implemented it specifically for Citizen Kane for right now. The instruction is just "REMEMBER", which
is nice because it contains no "spoilers" about Rosebud? I like that it's ambiguous and pairs so poorly with the shooting mechanic? (Other than synapses firing? Ha!) I should really think/check whether we should interpret Kane saying "Rosebud" as him remembering Rosebud or something else - there might be a better word. Whatever the word is, it gets straight to the heart of this project of representing more complex ideas in Combat. While of course, of course falling prey to just the same kinds of stupidities games suffer from when they have "Press X to pay respects" or similar, right? The fact you shoot and die, however, is what I think makes this worthwhile (as opposed to a cutscene or lame animation without consequence).

__Added game over screen with text__. Uses the same code unsurprisingly. The game over when you remember is "YOU REMEMBERED ROSEBUD". Originally I'd thought it would just be "YOU REMEMBERED", but it actually typing it in I added ROSEBUD both for the blank comedy of it, but also because it actually solves the potential problem of players not having their audio on. It makes the game more playable, and I should probably think about whether there are ways to do similar signaling elsewhere - though perhaps Kane is the only one that relies so directly on a specific audio file? Well Taxi Driver too.

__Added failure timer__ if you spend too long without shooting. Then YOU DIDN'T REMEMBER ROSEBUD (funny to remember Rosebud in the failure message). Definitely like that there's a fail state.

A couple of extra thoughts to go on with...

__Should you be able to move a bit?__ Currently all you can do is shoot, should you be able to thrash a little bit in your bed maybe? Just back and forth? In the movie he looks pretty damn incapacitated, but maybe just a wiggle between the three adjacent frames?

__A Combat tank looks like a sled?__ I mean, it does. Is there some weird possibility of leveraging that? Having the enemy tank appear as if it's rosebud? Could it be hit by the bullet and also die (to emulate it being burned?). Or does that get too weird and abstract? Where would the Rosebud tank be? Why does Kane-tank then also look like a sled by implication? Suspect this doesn't work.

---

# First draft? Violence stocktake (Wednesday, 5 August 2020, 17:13PM)

## First draft?

With today's push I feel like I probably have a "first draft" of the entire game in the sense that it has a menu, a flow, and versions of every subgame I'm envisaging including.

By and large I find the total package pretty satisfying, barring a few obvious fixes that are going to be needed here and there. Some Like It Hot continues to be a bit of a lame duck, but I'm holding onto it just as a teasing kind of thing about men-as-women trivialization.

Some of the ideas that I assumed would be satisfying, like saying "you talkin to me?" into the mirror as a tank do indeed feel satisfying. In fact it was kind of only in playing that that I realized the game serves almost as a kind of prelude to a regular match of Combat, one tank psyching itself out to go and be violent. There's something good in that.

## Violence stocktake

In terms of "commentary" on violence then we get

- Au hasard Balthazar - the presumed inability of a player not to act violently when it's a possible action
- Beau Travail - a tank post-the moment of violence, in heaven or hell or wherever you go, dancing (a pleasingly non-violent activity)
- Citizen Kane - being subjected to death of old age rather than a violent death
- L'Avventura - a tough sell, I feel like there's violence/menace to the actual movie, the violence of bad relationships?
- Rashomon - about the perception of violence, stories about violence
- Some Like it Hot - not really about violence, though using the same "trick" to make Combat be about women fighting instead of tanks or something
- Taxi Driver - about the prelude to violence, the psychology of a violent man
- The Conversation - about being adjacent to violence, paying attention to violence
- The Godfather - about being the helpless subject of violence
- 2001 - about unequal violence, violence as evolutionary necessity

So you know what? Not really too bad at all. In all these cases the violence is spotlighted by Combat, and Combat is softened/complicated by the films.

---

# J+M response (Thursday, 6 August 2020, 9:50AM)

Overnight I got responses to the game from both Jim and Mary (my parents if you're reading this and you aren't me, but you probably are me, hi!).

So, the bad news is that the game did not come across well for either of them. I've sent a follow-up email, but the key issue appears to have been to do with a lack of agency and thus anything that happened seeming kind of random. At least some of this appears to be a lack of understanding of how to drive the tank. Although the menu system does lay out the controls (arrow keys and space), that clearly wasn't enough. Further, not every game even lets you move in the first place (Citizen Kane is actually the only one now I think about it). Further, your movement is not always very relevant in other games (The Conversation, Taxi Driver at present). And even when it's relevant it might not really be acknowledged by the system in any particular way (e.g. "dancing" is just dancing, it's not something where you get points for it).

Now, a lack of feeling major agency isn't a huge issue in terms of getting the ideas behind the various games, but it is a bit disappointing just in terms of wanting the game to feel fun/amusing/interesting rather than frustrating/boring/opaque.

There are a few bits and pieces I will do and could do that would mitigate some of this, but not the major issue of the games themselves just being low-agency/low-feedback in the first place...

- Sound cues for some of the levels will be a thing, that may help things seem a bit more meant
- Could add points cues in some places, such as points for dancing in Beau Travail, perhaps
- Could add significantly more detailed instructions
- Could add instructions per game that specify how each game works, rather than the kind of cutesy little instructions I have at the moment (this would be more in keeping with Atari instructions, frankly, maybe I could even go over-board and explain the shit out of each game?)

So there are a few options here that might offer solace. Mostly I probably just need to get the damn thing finished and move on though!!

---

# Going manual (Friday, 7 August 2020, 14:56PM)

Alright so after the sadnesses of lacks of understanding, the idea is to pursue far more detailed instructions more in keeping with the [Atari manual for Combat](https://atariage.com/manual_page.php?SystemID=2600&SoftwareLabelID=94&ItemTypeID=&currentPage=0&maxPages=8).

Just found this amazing nugget of information: All games end after 2 minutes, 16 seconds. Which is 136 seconds. Wonder how they came up with that?

Here are some notes on the Combat manual that might pertain to my game:

- There's a really nice title page with that classic Atari game thing of outlandishly lush painted artwork suggesting the ideas of the game while being totally not representative of what you actually get. Could be a chance to make something like that for an initial splash screen?
- There's a full page just talking about how the joystick works, doesn't even mention shooting, it's purely about movement. This could be some kind of basis for instructions. Nice to see the layouts with blue-backgrounded diagrams and yellow background "rule of thumb".
- Then there's a "Missile Action" page which is entirely about shooting in the different games, tells you how to fire and then the behaviour of different missiles in different games (e.g. straight versus guided
- Then it starts describing genres of game (TANK GAMES, TANK-PONG GAMES) and subgames within each (Open Field, Easy Maze, etc.), along with the Missile style. None of this really makes sense in my context because this is premised on the kind of combinatorial style of Combat, whereas all the subgames in Combat at the Movies are more or less unique.
- At the back is literally a combinatorial chart where you can see game numbers, game genres, and missile types, and fields.

So, looking at that, it might be more possible to take some of the format (font, headings, screenshots, etc.) but not really the content/writing itself. My premise would be for now:

- Use a splash screen (will have to think about what image I could use though)
- Menu screen should look like a list of games and you can select with a cursor, present them chronologically?
- Then before each game you get an instructions screen to read which describes the game in some detail including the controls and lets you hit a key to continue to play itself? I think that seems pretty reasonable?

What about game over screens? Do I keep the same kind of quip-based ending? Or do I describe the basic outcomes in the instructions and have no reaction from the game when the round ends? If so I'd generally need point to indicate outcomes a little better, and just some kind of game over with "press a key" to return to the menu.

Also should add escape to menu any time.
