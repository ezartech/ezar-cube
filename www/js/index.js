var app = {
    init: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    
    onDeviceReady: function() {
        ezar.initializeVideoOverlay(
            function() {
                ezar.getBackCamera().start();
                app.renderCube();
            },
            function(err) {
                alert('Error:' + err);
            }
        )
    },
    
    renderCube: function() {
        var scene = new THREE.Scene();
        var cam = new THREE.PerspectiveCamera(70, window.innerWidth/window.innerHeight, 1, 10000);
        var renderer = new THREE.WebGLRenderer( { alpha: true });
        renderer.setClearColor(0xffffff,0);
            
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);
            
        var geometry = new THREE.BoxGeometry(700, 700, 700, 10, 10, 10);
        var material = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true});
        var cube = new THREE.Mesh(geometry, material);
            
        scene.add(cube);
        cam.position.z = 2000;        
            
        function render() {
            requestAnimationFrame(render);
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            renderer.render(scene, cam);
        };
                
        render();
    }
}

app.init();