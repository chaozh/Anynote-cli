angular.module('simplemde', [])
       .constant('SIMPLEMDE_EVENTS', {
            mdeInit: 'mde-init',
            mdeUpdating: 'mde-updating',
            mdeUpdated: 'mde-updated',
            mdeRender: 'mde-render'

        })
       .directive('simplemde', ['SIMPLEMDE_EVENTS', simplemdeDirective]);

function simplemdeDirective(SIMPLEMDE_EVENTS) {
    return {
      restrict: 'EA',
      require: '?ngModel',
      controller: ['$scope', function($scope) {
        return {
          get: function() {
            return $scope.simplemde.instance;
          }
        };
      }],
      compile: function() {
        // Require CodeMirror
        if (angular.isUndefined(window.SimpleMDE)) {
          throw new Error('simplemde needs SimpleMDE to work... (o rly?)');
        }

        return postLink;
      }
    };


    function postLink(scope, element, attrs, ngModel) {
        var options = angular.extend(
                { value: element.text() },
                scope.$eval(attrs.simplemde),
                scope.$eval(attrs.simplemdeOpts)
            );
        var editor = newEditor(element, options);

        configEditorOptionsWatcher(
          editor,
          attrs.simplemde || attrs.simplemdeOpts,
          scope
        );

        configNgModelLink(editor, ngModel, scope);

        scope.$on(SIMPLEMDE_EVENTS.mdeInit, function(event, callback) {
          if (angular.isFunction(callback)) {
            callback(editor);
          } else {
            throw new Error('the SimpleMDE event requires a callback function');
          }
        });

        // onLoad callback
        if (angular.isFunction(options.onLoad)) {
          options.onLoad(editor);
        }

        scope.simplemde = {
            instance : editor
        };
    }

    function newEditor(element, options){
        options.element = element[0];
        return new SimpleMDE(options);
    }

    function configEditorOptionsWatcher(editor, options, scope) {
        if (!options) { return; }

        var editorDefaultsKeys = Object.keys(options);
        scope.$watch(options, updateOptions, true);

        function updateOptions(newValues, oldValue) {
          if (!angular.isObject(newValues)) { return; }
          editorDefaultsKeys.forEach(function(key) {
            if (newValues.hasOwnProperty(key)) {

              if (oldValue && newValues[key] === oldValue[key]) {
                return;
              }
              // update option
              editor.setOption(key, newValues[key]);
            }
          });
        }
    }

    function configNgModelLink(editor, ngModel, scope) {
        // $viewValue == $modelValue
        editor.codemirror.on('change', function(instance) {
            var newValue = instance.getValue();
            if (newValue !== ngModel.$viewValue) {
                scope.$emit(SIMPLEMDE_EVENTS.mdeUpdating, newValue);
                scope.$applyAsync(function() {
                    ngModel.$setViewValue(newValue);
                    //update event trigger
                    scope.$emit(SIMPLEMDE_EVENTS.mdeUpdated, newValue);
                });
            }
        });

        ngModel.$render = function() {
          var val = ngModel.$viewValue || '';
          //render event trigger
          scope.$emit(SIMPLEMDE_EVENTS.mdeRender, val);
          editor.value(val);
        };
    }
}
