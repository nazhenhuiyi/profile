'use client';
import Matter from 'matter-js';
import { useEffect, useRef } from 'react';

export const TopPlayground = () => {
  const containerRef = useRef();

  useEffect(() => {
    console.log(1);
    // module aliases
    var Engine = Matter.Engine,
      Render = Matter.Render,
      World = Matter.World,
      Bodies = Matter.Bodies,
      Mouse = Matter.Mouse,
      MouseConstraint = Matter.MouseConstraint;

    // create an engine
    var engine = Engine.create();

    var width = window.innerWidth;
    var height = 300;

    // create a renderer
    var render = Render.create({
      element: containerRef.current,
      options: {
        width: width,
        height: height,
        background: '#ffffff',
        wireframes: false,
        pixelRatio: 2 //Pixel比; スマホ用に2にする
      },
      engine: engine
    });
    var mouse = Mouse.create(render.canvas),
      mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          stiffness: 0.2,
          render: {
            visible: false
          }
        }
      });

    const bodies = [];
    // create two boxes and a ground
    bodies.push(
      Bodies.rectangle(0, 0, width * 2, 10, {
        isStatic: true,
        render: {
          fillStyle: 'red',
          visible: false
        }
      })
    );
    bodies.push(
      Bodies.rectangle(0, height, width * 2 + 10, 10, {
        isStatic: true,
        render: {
          fillStyle: 'red',
          visible: false
        }
      })
    );
    bodies.push(
      Bodies.rectangle(0, 0, 10, height * 2, {
        isStatic: true,
        render: {
          fillStyle: 'red',
          visible: false
        }
      })
    );
    bodies.push(
      Bodies.rectangle(width, 0, 10, height * 2, {
        isStatic: true,
        render: {
          fillStyle: 'red',
          visible: false
        }
      })
    );
    for (var i = 0; i < 30; i++) {
      bodies.push(
        Bodies.circle(
          Math.random() * (width - 0) + 0, //x座標
          Math.random() * (height - 140) + 140, //y座標
          20, //半径
          {
            density: 0.0005, //密度
            frictionAir: 0.02, //空気抵抗
            restitution: 0.8, //反発
            friction: 0.1 //摩擦
          }
        )
      );
    }
    World.add(engine.world, bodies);
    World.add(engine.world, mouseConstraint);

    // run the engine
    Matter.Runner.run(engine);

    // run the renderer
    Render.run(render);
    var deviceOrientation = window.orientation;
    const handleDeviceMotion = function devicemotionHandler(event) {
      //重力加速度 (物体の重力を調節)
      var xg = event.accelerationIncludingGravity.x / 10;
      var yg = event.accelerationIncludingGravity.y / 10;

      // 傾きに応じて重力を調節
      switch (deviceOrientation) {
        case 0:
          engine.world.gravity.x = xg + event.acceleration.x;
          engine.world.gravity.y = -yg + event.acceleration.y;
          break;
        case 90:
          engine.world.gravity.x = -yg - event.acceleration.x;
          engine.world.gravity.y = -xg + event.acceleration.x;
          break;
        case -90:
          engine.world.gravity.x = yg + event.acceleration.x;
          engine.world.gravity.y = xg - event.acceleration.x;
          break;
        case 180:
          engine.world.gravity.x = -xg - event.acceleration.x;
          engine.world.gravity.y = yg - event.acceleration.x;
      }

      // androidとiOSは加速度が真逆なのでその対応
      if (window.navigator.userAgent.indexOf('Android') > 0) {
        engine.world.gravity.x = -engine.world.gravity.x;
        engine.world.gravity.y = -engine.world.gravity.y;
      }
    };
    window.addEventListener('devicemotion', handleDeviceMotion);
    return () => {
      window.removeEventListener('devicemotion', handleDeviceMotion);
    };
  }, []);
  return <div ref={containerRef} id="playground-container"></div>;
};
