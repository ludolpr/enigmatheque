INSERT INTO
    membres (
        name,
        password,
        email,
        isVerified,
        isAdmin,
        isBan,
        avatar
    )
VALUES
    (
        "Admin",
        sha2("ludo90Eni-",256),
        "ludolpr@gmail.com",
        1,
        1,
        0,
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.ms_ni44c-_TBsdHzF"
    );

INSERT INTO
    membres
SET
    ? name = "${Admin}",
    password = "${hash}",
    email = "${ludolpr@gmail.com}",
    isVerified = 1,
    isAdmin = 1,
    isBan = 0,
    avatar = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.ms_ni44c-_TBsdHzF"
insert into
    users
values
    (
        3,
        'Admin',
        'Admin',
        'admin@gmail.com',
        MD5('admin'),
        'avatar.jpg',
        'Saint Saturnin',
        '8 rue des tilleuls',
        72650,
        'France',
        'Admin',
        1,
        0,
        0,
        1
    );



update user set isAdmin=1 where id=2