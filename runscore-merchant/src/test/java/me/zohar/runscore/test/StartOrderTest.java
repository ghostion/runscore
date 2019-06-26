package me.zohar.runscore.test;

import org.junit.Test;

import cn.hutool.crypto.digest.DigestAlgorithm;
import cn.hutool.crypto.digest.Digester;

public class StartOrderTest {

	@Test
	public void test() {
		String merchantNum = "1001";
		String merchantOrderNo = "dfjkrjekre3434";
		Double amount = 300d;
		String notifyUrl = "http://localhost:8082/platform-order";
		String secretKey = "456";
		String sign = merchantNum + merchantOrderNo + String.valueOf(amount) + notifyUrl + secretKey;
		sign = new Digester(DigestAlgorithm.MD5).digestHex(sign);
		System.out.println(sign);

	}

}
