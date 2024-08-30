// place files you want to import through the `$lib` alias in this folder.
export { default as VisibleIcon } from '$lib/assets/images/visible-icon.png';
export { default as NotVisibleIcon } from '$lib/assets/images/not-visible-icon.png';
export { default as PlayerAvatar } from '$lib/assets/images/player-avatar.png';
export { default as RemoveIcon } from '$lib/assets/images/remove.png';
export { default as HomeIcon } from '$lib/assets/images/home.png';
export { default as AccountIcon } from '$lib/assets/images/account.png';
export { default as MaximizeIcon } from '$lib/assets/images/maximize-icon.png';
export { default as MinimizeIcon } from '$lib/assets/images/minimize-icon.png';

export const guide = {
	'/': [
		{
			roles: ['user'],
			bullets: [
				'If this is your first time here, please click the Register button to create an account.',
				'If you have already registered, click the Login button to proceed.'
			]
		}
	],
	'/register': [
		{
			roles: ['user'],
			bullets: [
				'Complete the required fields and click Sign Up to continue.',
				'The Email Address field must contain a valid email address. We will never send you an unsolicited email for any reason.',
				'Password and Confirm Password fields much match exactly.',
				'All fields are required.'
			]
		}
	],
	'/login': [
		{
			roles: ['user'],
			bullets: [
				'Enter your email address and password to continue.',
				'Change password functionality will be available in a future release.'
			]
		}
	],
	'/account': [
		{
			roles: ['user'],
			bullets: [
				'You can logout of your account by clicking the Logout button.',
				'Additional account management features will be implemented in a future release.'
			]
		}
	],
	'/play': [
		{
			roles: ['user'],
			bullets: [
				'You can host a new game or join an existing game.',
				'If you were provided a code to join a game, click the Join Game button.',
				'If you would like to start a new game, click the Host Game button and follow the prompts.',
				'A minimum of four (4) players are required to play a game.'
			]
		}
	],
	'/play/host': [
		{
			roles: ['user'],
			bullets: [
				'Share the code on this page with your friends to have them join your game.',
				'Click the Continue button to be directed to the lobby where you can wait for others to join.  The game code will also be displayed in the lobby.',
				'A minimum of four (4) players are required to play a game.',
				'All players will be required to register and login before joining the game.',
				"If you don't want to host a game right now, click the Cancel button to return to the main menu."
			]
		}
	],
	'/play/join': [
		{
			roles: ['user'],
			bullets: [
				'If you were provided a code to join a game, enter it in the Enter Code field and click the Join button.',
				'Otherwise, click the Cancel button to return to the main menu.  Then click the Host Game button to start a new game.'
			]
		}
	],
	'/play/game': [
		{
			roles: ['user'],
			bullets: [
				'This is the lobby, where you will wait for others to join your game.',
				"If you haven't already, share the code provided on this page with your friends.",
				'As players join the game, their names will be displayed on this page.',
				"You can remove players from your game by click the 'X' next to their name.",
				'A minimum of four (4) players are required to play a game.',
				'Once all players have joined, click the Start button to begin the game.',
				'Click the Exit button to return to the main menu.'
			]
		}
	],
	'inform detectives': [
		{
			roles: ['Informant'],
			bullets: [
				'Draw six cards from the draw pile.',
				'Choose a card and place it face-up in the middle of the table.',
				'Choose a word that reflects the chosen card and enter it into the clue input. DO NOT tell anyone the clue!',
				'Click Submit.'
			]
		},
		{
			roles: ['Detective', 'Conspirator'],
			bullets: [
				'Wait for the Informant to draw six cards.',
				"Starting with the player to the Informant's left and proceeding clockwise, all players will also draw six cards.",
				'Once all players have drawn six cards, wait for the Informant to submit their clue.'
			]
		}
	],
	'submit evidence': [
		{
			roles: ['Informant'],
			bullets: [
				'Starting with the player to your left and proceeding clockwise, all players play one card from their hand that matches the given clue.',
				'Once all players have played a card, choose a second card and place it next to your first card.',
				'Wait for all players to play their second card.',
				'Once all players have played two cards, click the button to proceed to the next stage.'
			]
		},
		{
			roles: ['Detective'],
			bullets: [
				'As a Detective, you have access to the clue provided by the Informant.  The Conspirator does not.',
				"Starting with the player to the Informant's left and continuing clockwise, all players play one card from their hand that matches the given clue.",
				'After all players have played a card, another round is played with all players, starting with the Informant, placing a second card face-up next to their first.',
				'Once all players have played two cards, the Informant will advance the game to the next stage.'
			]
		},
		{
			roles: ['Conspirator'],
			bullets: [
				'As the Conspirator, you are unable to see the clue provided by the Informant.',
				"Starting with the player to the Informant's left and continuing clockwise, all players play one card from their hand that matches the given clue.",
				"Since you don't know the clue, you will need to deduce it based on the cards presented by the other players.",
				'After all players have played a card, another round is played with all players, starting with the Informant, placing a second card face-up next to their first.',
				'Once all players have played two cards, the Informant will advance the game to the next stage.'
			]
		}
	],
	'defend evidence': [
		{
			roles: ['Informant'],
			bullets: [
				'State your clue and explain why you chose the two cards that you played to reflect those words.',
				'All other players do the same, proceeding clockwise.',
				'Once all players have explained their choices, click the button to advance the game to the next stage.'
			]
		},
		{
			roles: ['Detective', 'Conspirator'],
			bullets: [
				'The Informant states their clue and explains why they chose the two cards that they played to reflect those words.',
				'All other players do the same, proceeding clockwise.',
				'Once all players have explained their choices, the Informant will advance the game to the next stage.'
			]
		}
	],
	'vote on conspirator': [
		{
			roles: ['Informant'],
			bullets: [
				"As the Informant, you may not vote.  But you may still score points depending on other players' votes.",
				'Once all votes have been placed, you may click the button to proceed to the results of the round.'
			]
		},
		{
			roles: ['Detective', 'Conspirator'],
			bullets: [
				'Select a player from the list to accuse them of being the Conspirator.  You may NOT vote for yourself or the Informant.',
				'Once your vote is made, click the submit button.',
				'Once all votes have been placed, the Informant will advance the game to view the results of the round.'
			]
		}
	],
	'view results': [
		{
			roles: ['Informant', 'Detective', 'Conspirator'],
			bullets: [
				'Each detective who voted correctly and selected the Conspirator scores 3 victory points (VP).',
				'If the Conspirator received less than two votes, then the Conspirator scores 5 VP and the Informant scores 4 VP.',
				'If there are 2 or more votes for the Conspirator, then the Conspirator and Informant do not score any VP.'
			]
		}
	],
	'round end': [
		{
			roles: ['host'],
			bullets: [
				'Discard your cards.',
				'If this is the final round, the winner is displayed and you may click the End Game button to end the game and return to the home page.',
				'If this is not the final round, click the Finish Round button to begin the next round.'
			]
		},
		{
			roles: ['player'],
			bullets: [
				'Discard your cards.',
				'If this is the final round, the winner is displayed and you may click the Home button to exit the game and return to the home page.',
				'If this is not the final round, please wait for the host to advance the game to the next round.'
			]
		}
	]
};
