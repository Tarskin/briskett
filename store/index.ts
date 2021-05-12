interface AppState {
	connectedAccountPath: string;
	connectedAddress: string;
	connectedAddressBalance: number;
	connectedAddressBaker: string;
	connectedAccountIsActivated: boolean;
}

export const state = (): AppState => ({
	connectedAccountPath: "m/44'/1729'/0'",
	connectedAddress: "",
	connectedAddressBalance: 0.0,
	connectedAddressBaker: "",
	connectedAccountIsActivated: false,
});

export const getters = {};

export const mutations = {
	setConnectedAddress(state: AppState, payload: string) {
		state.connectedAddress = payload;
	},
	setConnectedAddressBalance(state: AppState, payload: number) {
		state.connectedAddressBalance = payload;
	},
	setConnectedAddressBaker(state: AppState, payload: string) {
		state.connectedAddressBaker = payload;
	},
	setConnectedAccountIsActivated(state: AppState, payload: boolean) {
		state.connectedAccountIsActivated = payload;
	},
};

export const actions = {
	loadConnectedAccountData(context: any) {
		fetch(
			`https://api.tzstats.com/explorer/account/${context.state.connectedAddress}`
		)
			.then((r) => r.json())
			.then(
				(payload: {
					total_balance: string;
					delegate: string;
					is_activated: boolean;
				}) => {
					context.commit(
						"setConnectedAddressBalance",
						payload?.total_balance || 0
					);
					context.commit("setConnectedAddressBaker", payload.delegate);
					context.commit(
						"setConnectedAccountIsActivated",
						payload.is_activated
					);
				}
			);
	},
};
