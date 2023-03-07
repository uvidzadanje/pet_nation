<template>
    <footer>
        <section class="links-container pt-3">
            <div class="row">
                <div class="col-md-3 d-flex flex-column align-items-center">
                    <h2>Navigacija</h2>
                    <router-link to="/aboutus" class="pb-2"> O nama</router-link>
                    <router-link to="/proizvodi" class="pb-2">Pretrazi proizvode</router-link>
                    <router-link to="/usluge" class="pb-2">Pretrazi usluge</router-link>
                </div>
                <div class="col-md-3 d-flex flex-column align-items-center">
                    <h2>Contact info</h2>
                    <p>Telefon: 123456789</p>
                    <p>Email: example@gmail.com</p>
                    <p>Adresa: ulica grad broj</p>
                </div>
                <div class="col-md-3 d-flex flex-column align-items-center">
                    <h2>Pomoc</h2>
                    <p>Pomoc & FAQ</p>
                    <p>Return Policy</p>
                    <p></p>
                </div>
                <div class="col-md-3 d-flex flex-column align-items-center">
                    <h2>Legal info</h2>
                    <p>Privacy Policy</p>
                    <p>Terms & Conditions</p>
                    <p>Cookie policy</p>
                </div>
            </div>
        </section>
        <section class="copyright text-center pt-2">
            <p>&copy; 2022 PetNation. Sva prava zadržava</p>
        </section>
    </footer>
</template>

<script>

export default {
    name: 'Footer'
}
</script>
