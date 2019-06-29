package me.zohar.runscore.config.security.xss;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ReadListener;
import javax.servlet.ServletInputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.TypeReference;

import cn.hutool.core.io.IoUtil;
import cn.hutool.core.util.EscapeUtil;

public class XssHttpServletRequestWrapper extends HttpServletRequestWrapper {

	public XssHttpServletRequestWrapper(HttpServletRequest request) {
		super(request);
	}

	@Override
	public String getHeader(String name) {
		String value = super.getParameter(name);
		if (value != null) {
			value = EscapeUtil.escapeHtml4(value);
		}
		return value;
	}

	@Override
	public String getQueryString() {
		String value = super.getQueryString();
		if (value != null) {
			value = EscapeUtil.escapeHtml4(value);
		}
		return value;
	}

	@Override
	public String getParameter(String name) {
		String value = super.getParameter(name);
		if (value != null) {
			value = EscapeUtil.escapeHtml4(value);
		}
		return value;
	}

	@Override
	public String[] getParameterValues(String name) {
		String[] values = super.getParameterValues(name);
		if (values != null) {
			int length = values.length;
			String[] escapseValues = new String[length];
			for (int i = 0; i < length; i++) {
				escapseValues[i] = EscapeUtil.escapeHtml4(values[i]);
			}
			return escapseValues;
		}
		return values;
	}

	@Override
	public ServletInputStream getInputStream() throws IOException {
		String str = new String(IoUtil.readBytes(super.getInputStream()));
		Map<String, Object> map = JSON.parseObject(str, new TypeReference<Map<String, Object>>() {
		});
		Map<String, Object> resultMap = new HashMap<>(map.size());
		for (String key : map.keySet()) {
			Object val = map.get(key);
			if (map.get(key) instanceof String) {
				resultMap.put(key, EscapeUtil.escapeHtml4(val.toString()));
			} else {
				resultMap.put(key, val);
			}
		}
		str = JSON.toJSONString(resultMap);
		final ByteArrayInputStream bais = new ByteArrayInputStream(str.getBytes());
		return new ServletInputStream() {
			@Override
			public int read() throws IOException {
				return bais.read();
			}

			@Override
			public boolean isFinished() {
				return false;
			}

			@Override
			public boolean isReady() {
				return false;
			}

			@Override
			public void setReadListener(ReadListener listener) {
			}
		};
	}

}
