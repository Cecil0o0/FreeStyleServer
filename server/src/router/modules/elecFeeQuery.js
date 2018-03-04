const request = require('co-request')

const ResultSchema = require('../../util/resultSchema.js')

function elecFeeQuery(router) {
  router.get('/elecFeeQuery/:accountNumber', async (ctx, next) => {
    const { accountNumber } = ctx.params
    let res = await getResult(accountNumber)
    if (res.statusCode == 200) {
      ctx.body = ResultSchema({ state: 1000, msg: res.body })
    } else {
      ctx.body = ResultSchema({ state: 1100, msg: res.body })
    }
    next()
  })
}

async function getResult(accountNumber) {
  return await request.post({
    url: 'https://jiaofei.alipay.com/fare/ebppQueryBill.json',
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.108 Safari/537.36',
      COOKIE:
        'JSESSIONID=RZ25IcO3ayhnnoKarw1ut3vlDwO2xjauthGZ00RZ24; cna=bPmjEWeL5RYCAXPAbstVUSas; l=ArGxboK5TImV4B5Q77TEj58NQTZKqSRq; isg=AoCAf3ZEzlAp7rFgMg1BL6e1UQiSoWXjHziOg_oRwRmKdSKfohtIYgYF--tO; OUTFOX_SEARCH_USER_ID_NCOO=1694877879.669282; mobileSendTime=-1; credibleMobileSendTime=-1; ctuMobileSendTime=-1; riskMobileBankSendTime=-1; riskMobileAccoutSendTime=-1; riskMobileCreditSendTime=-1; riskCredibleMobileSendTime=-1; riskOriginalAccountMobileSendTime=-1; ALIPAY_WAP_CASHIER_COOKIE=7EBBAD9B006F25F04B6F3FD0A23C0FFCCA518DCD16F03950A49CFADD8311EF32; EXC_ANT_KEY="excashier_20001_FP_SENIOR_1515568117599TLRI,excashier_20001_FP_SENIOR_1515642021882UJPS,excashier_20001_FP_SENIOR_1515642103537MVOR"; spanner=rGIP/K7Is7cLvzlw40gQEzN5TrTQWqyBXt2T4qEYgj0=; LoginForm=alipay_login_auth; alipay=K1iSL16SV9OwwNyJ5eRZysnebvBXMwi3rFNn6uYU+lnCKtq22J6v; CLUB_ALIPAY_COM=2088702474656960; iw.userid="K1iSL16SV9OwwNyJ5eRZyg=="; ali_apache_tracktmp="uid=2088702474656960"; session.cookieNameId=ALIPAYJSESSIONID; ALIPAYBUMNGJSESSIONID=GZ00FUmFtPcJdQmopKyveScGiNiXPEmobilecodecGZ00; ctoken=d3Z2Z32AALu4dLHW; zone=RZ24A; JSESSIONID=411B222101B6A3607339CF7FBB5ED1AC; ALIPAYJSESSIONID=RZ25IcO3ayhnnoKarw1ut3vlDwO2xjauthGZ00RZ24; rtk=MpuOkI7Hp+euQuUCCpUr1UkszlIM1ChY81T2sC1D8dOj6UHYRkm',
      Referer:
        'https://jiaofei.alipay.com/fare/ebppChargeEntering.htm?chargeType=electric&province=%25D5%25E3%25BD%25AD&city=%25BA%25BC%25D6%25DD',
      'Content-Type':
        'application/x-www-form-urlencoded;charset=UTF-8',
      Host: 'jiaofei.alipay.com'
    },
    form: {
      agent: 'INTERNAL',
      cacheKey: 'utility_32aa09e0c538dfa2304e7e852fba5295',
      billKey: accountNumber,
      chargeInst: 'HANGZHOUELE',
      subBizType: 'ELECTRIC'
    }
  })
}

module.exports = elecFeeQuery
