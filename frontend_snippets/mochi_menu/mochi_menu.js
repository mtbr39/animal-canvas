const mochi_menu = new Vue({
    el: '#mochi_menu',
    data: {
        menu_items: [
            { classname: { "fas fa-home": true } },
            { classname: { "far fa-bell": true } },
            { classname: { "far fa-bookmark": true } }
        ],
        active_menu: 0,
        pre_active_menu: 2,
        click_flash: false,
        on_animation: false,
        anime_reqired_time: 1000
    },
    methods: {
        menu_click(n) {
            if (this.on_animation) {
                return;
            }
            this.start_click_flash();
            this.start_anime_timer();
            this.pre_active_menu = this.active_menu;
            if (n != this.active_menu) {

                this.active_menu = n;
            } else {
                this.active_menu = 0;
            }
            console.log("[active_menu] = ", this.active_menu, this.pre_active_menu);
        },
        start_click_flash() {
            this.click_flash = false;
            setTimeout(
                () => { this.click_flash = true; },
                1
            );

        },
        start_anime_timer() {
            this.on_animation = true;
            setTimeout(
                () => {
                    this.on_animation = false;
                    console.log("stop anime timer");
                },
                this.anime_reqired_time
            );
            console.log("start anime timer");
        },
        anime_state(class_names) {
            let str = ''
            if (this.active_menu == 0 && this.pre_active_menu != 0)
                str = class_names.zero_to_x;
            else if (this.pre_active_menu == 0)
                str = class_names.x_to_zero;
            else if (this.click_flash)
                str = class_names.normal;
            return str;
        }
    },
    computed: {
        position_class() {
            let num = this.active_menu;
            if (this.active_menu == 0) {
                num = this.pre_active_menu;
                console.log("position cancel:", num);
            }

            return `position-${num}`;
        },
        mochi_vertical_class() {
            const class_names = {
                zero_to_x: 'drop_X_to_0',
                x_to_zero: 'drop_0_to_X',
                normal: 'drop_normal'
            };
            return this.anime_state(class_names);
        },
        rect_swell_class() {
            const class_names = {
                zero_to_x: 'swell_X_to_0',
                x_to_zero: 'swell_normal',
                normal: 'swell_normal'
            };
            return this.anime_state(class_names);
        }
    },

})
