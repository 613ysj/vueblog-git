package com.markerhub.shiro;

import org.apache.shiro.authc.AuthenticationToken;

/**
 * @author: saijie
 * @date: 2022/1/21 21:48
 */
public class JwtToken implements AuthenticationToken {
    private String token;
    public JwtToken(String token) {
        this.token = token;
    }
    @Override
    public Object getPrincipal() {
        return token;
    }

    @Override
    public Object getCredentials() {
        return token;
    }
}
