using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using API.Entities;
using API.Interfaces;
using Microsoft.IdentityModel.Tokens;

namespace API.Services;

public class TokenService(IConfiguration config) : ITokenService
{
    public string CreateToken(AppUser user)
    {
        // Implementation for creating token

        // Get the token key from configuration
        var tokenKey = config["TokenKey"] ?? throw new InvalidOperationException("TokenKey is not configured.");
        if(tokenKey.Length < 64)
        {
            throw new InvalidOperationException("TokenKey is empty.");
        }

        // Create a symmetric security key using the token key
        var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(tokenKey));

        // Create claims for the token
        var claims = new List<Claim>
        {
            new (ClaimTypes.Name, user.Email),
            new (ClaimTypes.NameIdentifier, user.Id)
        };

        // Create signing credentials using the security key and HMAC SHA512 algorithm
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

        // Create a security token descriptor with the claims, expiration, and signing credentials
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.Now.AddDays(7),
            SigningCredentials = creds
        };

        // Create a JWT token handler and generate the token
        var tokenHandler = new JwtSecurityTokenHandler();
        var token = tokenHandler.CreateToken(tokenDescriptor);

        return tokenHandler.WriteToken(token);
    }
}
