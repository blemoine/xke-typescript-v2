

    Tuto.ApplicationView = Ember.View.extend({
        templateName: "tutorial-app",
        didInsertElement: function () {
            SyntaxHighlighter.highlight();

            var view = this;
            execTestsSteps(Tuto.STEPS);
            Em.run.later(function () {
                var stepIsActive = $(".is-active");
                if (stepIsActive.length > 0) {
                    $('#tutorial').animate({
                        scrollTop: $(".is-active").offset().top
                    }, 100);
                } else {
                    view.set('status', " terminé !");
                    //var fworks = new Fireworks();
                }
            }, 200);

            $('#tutorial img').on('click', function () {
                window.location.reload();
            });
        }
    });

    Tuto.StepView = Em.View.extend({
        templateName: "tutorial-step",
        classNames: "step",
        classNameBindings: ['step.isActive'],
        solutionIsShown: false,
        toggleSolution: function () {
            this.toggleProperty("solutionIsShown");
            Em.run.next(function () {
                SyntaxHighlighter.defaults['gutter'] = false;
                SyntaxHighlighter.all();
            });
            this.$('.solution').stop().slideToggle(this.solutionIsShown);
        },
        explanationView: function () {
            return Em.View.extend({
                classNames: "well",
                templateName: this.step.detailTemplateName
            });
        }.property('step'),
        detailIsShownToggler: false,
        toggleDetail: function () {
            this.toggleProperty("detailIsShownToggler");
            $('.step-detail').not(this.$('.step-detail')).slideUp();
            this.$('.step-detail').stop().slideToggle(this.detailIsShownToggler);
        },
        detailIsShown: function () {
            return this.get('step.isActive') || this.detailIsShownToggler;
        }.property("step.isActive", "detailIsShownToggler"),
        errorsIsShown: function () {

        }.property("step.passed", "step.executed"),
        solutionView: function () {
            return Em.View.extend({
                tagName: "pre",
                classNames: ["code", "brush: js"],
                templateName: this.step.solutionTemplateName
            });
        }.property("step.solutionTemplateName")
    });

    Tuto.Step = Em.Object.extend({
        title: "",
        detailTemplateName: "tutorial-step-empty",
        solutionTemplateName: "tutorial-solution-empty",
        test: function () {
            ok(false, "Test not implemented")
        },
        passed: false,
        executed: false,
        errors: [],
        isActive: function () {
            return !this.passed && this.executed;
        }.property("passed", "executed")
    });

    Tuto.STEPS = [
        Tuto.Step.create({
            title: "Création de l'application",
            detailTemplateName: "tutorial-step-app",
            solutionTemplateName: "tutorial-solution-app",

            test: function () {
                ok(typeof App != "undefined",
                    "Il n'y a pas d'Objet App dans window");

                ok(Em.typeOf(App) == "instance",
                    "Cet objet App doit être un objet Ember");

                ok(App.rootElement == '#ember-app', "ember-app n'est pas la div racine de l'application");
            }
        })
    ];
});
