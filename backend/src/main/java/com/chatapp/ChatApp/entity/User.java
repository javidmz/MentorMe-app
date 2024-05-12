package com.chatapp.ChatApp.entity;

import com.chatapp.ChatApp.enums.Role;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Builder
@AllArgsConstructor
@Entity
@Table(name = "users")
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "first_name", length = 50, nullable = false)
    private String firstName;

    @Column(name = "last_name", length = 50, nullable = false)
    private String lastName;

    @Column(name = "username", nullable = false, unique = true)
    private String username;

    @Column(name = "password", nullable = false)
    private String password;

    @OneToMany(mappedBy = "chatCreator", cascade = {CascadeType.MERGE, CascadeType.REFRESH,
            CascadeType.DETACH, CascadeType.PERSIST})
    private List<Chat> chats;

    @OneToMany(mappedBy = "commentMaker", cascade = {CascadeType.MERGE, CascadeType.REFRESH,
            CascadeType.DETACH, CascadeType.PERSIST})
    private List<Comment> comments;

    @OneToMany(mappedBy = "fromUser", cascade = {CascadeType.MERGE, CascadeType.REFRESH,
            CascadeType.DETACH, CascadeType.PERSIST})
    private List<Reply> replies;

    @OneToMany(mappedBy = "user", cascade = {CascadeType.ALL}, orphanRemoval = true)
    private List<RefreshToken> tokens;

    @Enumerated(EnumType.STRING)
    private Role role;

    public User(String firstName, String lastName, String username) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
