export interface ChinaTotal {
	showLocalConfirm: number;
	mediumRiskAreaNum: number;
	localConfirm: number;
	mRiskTime: string;
	nowSevere: number;
	noInfectH5: number;
	local_acc_confirm: number;
	deadAdd: number;
	mtime: string;
	nowConfirm: number;
	localConfirmH5: number;
	confirmAdd: number;
	confirm: number;
	heal: number;
	dead: number;
	importedCase: number;
	noInfect: number;
	showlocalinfeciton: number;
	nowLocalWzz: number;
	suspect: number;
	localWzzAdd: number;
	localConfirmAdd: number;
	highRiskAreaNum: number;
}

export interface ChinaAdd {
	suspect: number;
	nowSevere: number;
	noInfect: number;
	noInfectH5: number;
	localConfirm: number;
	localConfirmH5: number;
	confirm: number;
	heal: number;
	dead: number;
	nowConfirm: number;
	importedCase: number;
}

export interface ShowAddSwitch {
	importedCase: boolean;
	noInfect: boolean;
	localConfirm: boolean;
	localinfeciton: boolean;
	all: boolean;
	nowConfirm: boolean;
	dead: boolean;
	heal: boolean;
	nowSevere: boolean;
	confirm: boolean;
	suspect: boolean;
}

export interface Total {
	nowConfirm: number;
	confirm: number;
	continueDayZeroLocalConfirm: number;
	dead: number;
	mtime: string;
	showRate: boolean;
	heal: number;
	wzz: number;
	mediumRiskAreaNum: number;
	showHeal: boolean;
	provinceLocalConfirm: number;
	highRiskAreaNum: number;
	continueDayZeroLocalConfirmAdd: number;
	adcode: string;
}

export interface Today {
	abroad_confirm_add: number;
	dead_add: number;
	confirm: number;
	confirmCuts: number;
	isUpdated: boolean;
	tip: string;
	wzz_add: number;
	local_confirm_add: number;
}

export interface Total {
	mtime: string;
	adcode: string;
	continueDayZeroConfirm: number;
	showRate: boolean;
	heal: number;
	provinceLocalConfirm: number;
	nowConfirm: number;
	continueDayZeroConfirmAdd: number;
	continueDayZeroLocalConfirmAdd: number;
	showHeal: boolean;
	dead: number;
	wzz: number;
	mediumRiskAreaNum: number;
	highRiskAreaNum: number;
	confirm: number;
}

export interface Today {
	confirmCuts: number;
	isUpdated: boolean;
	wzz_add: number;
	local_confirm_add: number;
	confirm: number;
}

export interface Total {
	continueDayZeroLocalConfirm: number;
	adcode: string;
	wzz: number;
	continueDayZeroLocalConfirmAdd: number;
	mtime: string;
	showRate: boolean;
	heal: number;
	mediumRiskAreaNum: number;
	confirm: number;
	dead: number;
	showHeal: boolean;
	provinceLocalConfirm: number;
	highRiskAreaNum: number;
	nowConfirm: number;
}

export interface Children {
	name: string;
	adcode: string;
	date: string;
	today: Today;
	total: Total;
}

export interface Children {
	name: string;
	adcode: string;
	date: string;
	today: Today;
	total: Total;
	children: Children[];
}

export interface Today {
	confirm: number;
	isUpdated: boolean;
}

export interface AreaTree {
	total: Total;
	children: Children[];
	name: string;
	today: Today;
}

export interface Diseaseh5Shelf {
	lastUpdateTime: string;
	chinaTotal: ChinaTotal;
	chinaAdd: ChinaAdd;
	isShowAdd: boolean;
	showAddSwitch: ShowAddSwitch;
	areaTree: AreaTree[];
}

export interface StatisGradeCityDetail {
	mtime: string;
	sdate: string;
	nowConfirm: number;
	confirmAdd: number;
	confirm: number;
	dead: number;
	date: string;
	syear: number;
	wzz_add: string;
	province: string;
	city: string;
	heal: number;
	grade: string;
}

export interface Data {
	diseaseh5Shelf: Diseaseh5Shelf;
	statisGradeCityDetail: StatisGradeCityDetail[];
}

export interface RootObject {
	ret: number;
	info: string;
	data: Data;
}
