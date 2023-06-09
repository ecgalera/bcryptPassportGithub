export const privacy = (privacyType) => {
    return (req, res, next) => {
        const { user } = req.session;
        switch (privacyType) {
            case "PRIVATE": // VALIDACION QUE DEJA PASAR A LOS QUE SE HAN LOGUEADO
                if (user) return next();
                else res.redirect("/login")
            case "NO_AUTHENTICATED":
                if(!user) return next();
                else res.redirect("/profile")

        }
    }
}