const http = (url) => {
	return fetch(url).then((res) => res.json());
};

/**
 * 查询基金经理排名，降序排列
 * @param {mfType: enum, sortColumn: enum, pageIndex: number, pageSize: number} param
 * @mfType -> 
 * @sortColum ->
 * @returns {Datas: item[]}
 * item {
		HY: "19.6469" ?
		JJGS: "工银瑞信基金" 基金公司
		JJGSID: "80064225" 基金
		M: "6.3139" 近一个月收益
		MFTYPE: "2" 类型
		MGOLD: "9.4165" 评分
		MGRID: "30406251" 经理ID
		MGRNAME: "张宇帆" 名称
		NETNAV: "497768886.12"
		NEWPHOTOURL: "https://pdf.dfcfw.com/pdf/H8_30406251_1.JPG"
		PRECODE: "001718" 基金代码
		Q: "7.1667" 近一季度收益
		SEX: "1"
		SHORTNAME: "工银物流产业股票"
		W: "1.543"
		Y: "88.2041" 最近一年
		YIELDSE: "25.8712" 年化回报
	}
 */
export const fetchFundManagerList = ({
	MFTYPE = 2,
	sortColumn = 'MGOLD',
	pageIndex = 1,
	pageSize = 30
}) => {
	return http(
		`https://fundmapi.eastmoney.com/fundmobapi/FundMApi/FundMangerBaseList.ashx?MFTYPE=${MFTYPE}&SortColumn=${sortColumn}&Sort=desc&pageIndex=${pageIndex}&pageSize=${pageSize}&deviceid=fundmanager2016&version=4.3.0&product=EFund&plat=Iphone`
	);
};

/**
 * 
 * @param {mgrid: number} param 
 * @returns 
 */
export const fetchFundManagerDetail = ({ mgrid }) => {
	return http(
		`https://fundmapi.eastmoney.com/fundmobapi/FundMApi/FundMangerBase.ashx?MGRID=${mgrid}&deviceid=fundmanager2016&version=4.3.0&product=EFund&plat=Iphone`
	);
};
