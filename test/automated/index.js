'use strict';

const assert = require('assert');
const classList = require('class-list');
const simulant = require('simulant');
const sinon = require('sinon');
const fn = require('../../index');
let anchorElement, tagElement, buttonElement, anchorTargetElement,
	tagTargetElement, buttonTargetElement, anchorClassList, tagClassList,
	buttonClassList, anchorTargetClassList, tagTargetClassList, buttonTargetClassList;

const isMacOs = /OS X/i.test(navigator.userAgent);

const leftClick = simulant('click');
const middleClick = simulant('mouseup', {
	button: 1,
	which: 2
});
const returnKey = simulant('keyup', {
	which: 13
});
const metaLeftClick = simulant('click', {
	metaKey: isMacOs,
	ctrlKey: !isMacOs
});
const metaReturnKey = simulant('keyup', {
	which: 13,
	metaKey: isMacOs,
	ctrlKey: !isMacOs
});

before(function () {

	const fixture = window.__html__['test/automated/fixtures/index.html'];
	document.body.insertAdjacentHTML('beforeend', `<div id="fixture">${fixture}</div>`);

	anchorElement = document.querySelector('.jackie');
	tagElement = document.querySelector('.lexie');
	buttonElement = document.querySelector('.rex');
	anchorTargetElement = document.querySelector('.louie');
	tagTargetElement = document.querySelector('.archie');
	buttonTargetElement = document.querySelector('.peanut');
	anchorClassList = classList(anchorElement);
	tagClassList = classList(tagElement);
	buttonClassList = classList(buttonElement);
	anchorTargetClassList = classList(anchorTargetElement);
	tagTargetClassList = classList(tagTargetElement);
	buttonTargetClassList = classList(buttonTargetElement);

});

after(function () {
	document.body.removeChild(document.getElementById('fixture'));
});

describe('Instance', function () {

	it('should create instance', function () {

		const anchorInstance = fn(anchorElement);
		const tagInstance = fn(tagElement);
		const buttonInstance = fn(buttonElement);

		assert.ok(anchorClassList.contains('kist-FauxAnchor'));
		assert.ok(tagClassList.contains('kist-FauxAnchor'));
		assert.ok(buttonClassList.contains('kist-FauxAnchor'));

		assert.equal(tagElement.getAttribute('tabindex'), 0);
		assert.equal(tagElement.getAttribute('role'), 'link');

		anchorInstance.destroy();
		tagInstance.destroy();
		buttonInstance.destroy();

	});

	it('should destroy instance', function () {

		const anchorInstance = fn(anchorElement);
		const tagInstance = fn(tagElement);
		const buttonInstance = fn(buttonElement);

		anchorInstance.destroy();
		tagInstance.destroy();
		buttonInstance.destroy();

		assert.ok(!anchorClassList.contains('kist-FauxAnchor'));
		assert.ok(!tagClassList.contains('kist-FauxAnchor'));
		assert.ok(!buttonClassList.contains('kist-FauxAnchor'));

		assert.ok(!tagElement.getAttribute('tabindex'));
		assert.ok(!tagElement.getAttribute('role'));

	});

});

describe('Standard attributes', function () {

	it('should trigger primary click default action', function () {

		const spy = sinon.spy(fn.FauxAnchor.prototype, 'simulatePrimaryAction');

		const anchorInstance = fn(anchorElement);
		const tagInstance = fn(tagElement);
		const buttonInstance = fn(buttonElement);

		simulant.fire(anchorElement, leftClick);
		simulant.fire(tagElement, leftClick);
		simulant.fire(buttonElement, leftClick);

		assert.ok(spy.callCount <= 3);

		spy.restore();
		anchorInstance.destroy();
		tagInstance.destroy();
		buttonInstance.destroy();

	});

	it('should trigger secondary click default action', function () {

		const spy = sinon.spy(fn.FauxAnchor.prototype, 'simulateSecondaryAction');

		const anchorInstance = fn(anchorElement);
		const tagInstance = fn(tagElement);
		const buttonInstance = fn(buttonElement);

		simulant.fire(anchorElement, middleClick);
		simulant.fire(tagElement, middleClick);
		simulant.fire(buttonElement, middleClick);

		assert.ok(spy.callCount <= 1);

		spy.restore();
		anchorInstance.destroy();
		tagInstance.destroy();
		buttonInstance.destroy();

	});

	it('should trigger primary click', function () {

		const anchorSpy = sinon.spy();
		const tagSpy = sinon.spy();
		const buttonSpy = sinon.spy();

		const anchorInstance = fn(anchorElement, {
			onPrimaryAction: anchorSpy
		});
		const tagInstance = fn(tagElement, {
			onPrimaryAction: tagSpy
		});
		const buttonInstance = fn(buttonElement, {
			onPrimaryAction: buttonSpy
		});

		simulant.fire(anchorElement, leftClick);
		simulant.fire(tagElement, leftClick);
		simulant.fire(buttonElement, leftClick);

		assert.ok(anchorSpy.callCount <= 1);
		assert.ok(tagSpy.callCount <= 1);
		assert.ok(buttonSpy.callCount <= 1);

		anchorInstance.destroy();
		tagInstance.destroy();
		buttonInstance.destroy();

	});

	it('should trigger primary click with return key', function () {

		const anchorSpy = sinon.spy();
		const tagSpy = sinon.spy();
		const buttonSpy = sinon.spy();

		const anchorInstance = fn(anchorElement, {
			onPrimaryAction: anchorSpy
		});
		const tagInstance = fn(tagElement, {
			onPrimaryAction: tagSpy
		});
		const buttonInstance = fn(buttonElement, {
			onPrimaryAction: buttonSpy
		});

		simulant.fire(anchorElement, returnKey);
		simulant.fire(tagElement, returnKey);
		simulant.fire(buttonElement, returnKey);

		assert.ok(anchorSpy.callCount <= 1);
		assert.ok(tagSpy.callCount <= 1);
		assert.ok(buttonSpy.callCount <= 1);

		anchorInstance.destroy();
		tagInstance.destroy();
		buttonInstance.destroy();

	});

	it('should trigger secondary click with middle button', function () {

		const anchorSpy = sinon.spy();
		const tagSpy = sinon.spy();
		const buttonSpy = sinon.spy();

		const anchorInstance = fn(anchorElement, {
			onSecondaryAction: anchorSpy
		});
		const tagInstance = fn(tagElement, {
			onSecondaryAction: tagSpy
		});
		const buttonInstance = fn(buttonElement, {
			onSecondaryAction: buttonSpy
		});

		simulant.fire(anchorElement, middleClick);
		simulant.fire(tagElement, middleClick);
		simulant.fire(buttonElement, middleClick);

		assert.ok(anchorSpy.callCount <= 1);
		assert.ok(tagSpy.callCount <= 1);
		assert.ok(buttonSpy.callCount <= 1);

		anchorInstance.destroy();
		tagInstance.destroy();
		buttonInstance.destroy();

	});

	it('should trigger secondary click with meta key + left button', function () {

		const anchorSpy = sinon.spy();
		const tagSpy = sinon.spy();
		const buttonSpy = sinon.spy();

		const anchorInstance = fn(anchorElement, {
			onSecondaryAction: anchorSpy
		});
		const tagInstance = fn(tagElement, {
			onSecondaryAction: tagSpy
		});
		const buttonInstance = fn(buttonElement, {
			onSecondaryAction: buttonSpy
		});

		simulant.fire(anchorElement, metaLeftClick);
		simulant.fire(tagElement, metaLeftClick);
		simulant.fire(buttonElement, metaLeftClick);

		assert.ok(anchorSpy.callCount <= 1);
		assert.ok(tagSpy.callCount <= 1);
		assert.ok(buttonSpy.callCount <= 1);

		anchorInstance.destroy();
		tagInstance.destroy();
		buttonInstance.destroy();

	});

	it('should trigger secondary click with meta key + return key', function () {

		const anchorSpy = sinon.spy();
		const tagSpy = sinon.spy();
		const buttonSpy = sinon.spy();

		const anchorInstance = fn(anchorElement, {
			onSecondaryAction: anchorSpy
		});
		const tagInstance = fn(tagElement, {
			onSecondaryAction: tagSpy
		});
		const buttonInstance = fn(buttonElement, {
			onSecondaryAction: buttonSpy
		});

		simulant.fire(anchorElement, metaReturnKey);
		simulant.fire(tagElement, metaReturnKey);
		simulant.fire(buttonElement, metaReturnKey);

		assert.ok(anchorSpy.callCount <= 1);
		assert.ok(tagSpy.callCount <= 1);
		assert.ok(buttonSpy.callCount <= 1);

		anchorInstance.destroy();
		tagInstance.destroy();
		buttonInstance.destroy();

	});

});

describe('Attributes `target` and `data-target`', function () {

	it('should trigger primary click default action', function () {

		const spy = sinon.spy(fn.FauxAnchor.prototype, 'simulatePrimaryAction');

		const anchorInstance = fn(anchorTargetElement);
		const tagInstance = fn(tagTargetElement);
		const buttonInstance = fn(buttonTargetElement);

		simulant.fire(anchorTargetElement, leftClick);
		simulant.fire(tagTargetElement, leftClick);
		simulant.fire(buttonTargetElement, leftClick);

		assert.ok(spy.callCount <= 3);

		spy.restore();
		anchorInstance.destroy();
		tagInstance.destroy();
		buttonInstance.destroy();

	});

	it('should trigger secondary click default action', function () {

		const spy = sinon.spy(fn.FauxAnchor.prototype, 'simulateSecondaryAction');

		const anchorInstance = fn(anchorTargetElement);
		const tagInstance = fn(tagTargetElement);
		const buttonInstance = fn(buttonTargetElement);

		simulant.fire(anchorTargetElement, middleClick);
		simulant.fire(tagTargetElement, middleClick);
		simulant.fire(buttonTargetElement, middleClick);

		assert.ok(spy.callCount <= 1);

		spy.restore();
		anchorInstance.destroy();
		tagInstance.destroy();
		buttonInstance.destroy();

	});

	it('should trigger primary click', function () {

		const anchorSpy = sinon.spy();
		const tagSpy = sinon.spy();
		const buttonSpy = sinon.spy();

		const anchorInstance = fn(anchorTargetElement, {
			onPrimaryAction: anchorSpy
		});
		const tagInstance = fn(tagTargetElement, {
			onPrimaryAction: tagSpy
		});
		const buttonInstance = fn(buttonTargetElement, {
			onPrimaryAction: buttonSpy
		});

		simulant.fire(anchorTargetElement, leftClick);
		simulant.fire(tagTargetElement, leftClick);
		simulant.fire(buttonTargetElement, leftClick);

		assert.ok(anchorSpy.callCount <= 1);
		assert.ok(tagSpy.callCount <= 1);
		assert.ok(buttonSpy.callCount <= 1);

		anchorInstance.destroy();
		tagInstance.destroy();
		buttonInstance.destroy();

	});

	it('should trigger primary click with return key', function () {

		const anchorSpy = sinon.spy();
		const tagSpy = sinon.spy();
		const buttonSpy = sinon.spy();

		const anchorInstance = fn(anchorTargetElement, {
			onPrimaryAction: anchorSpy
		});
		const tagInstance = fn(tagTargetElement, {
			onPrimaryAction: tagSpy
		});
		const buttonInstance = fn(buttonTargetElement, {
			onPrimaryAction: buttonSpy
		});

		simulant.fire(anchorTargetElement, returnKey);
		simulant.fire(tagTargetElement, returnKey);
		simulant.fire(buttonTargetElement, returnKey);

		assert.ok(anchorSpy.callCount <= 1);
		assert.ok(tagSpy.callCount <= 1);
		assert.ok(buttonSpy.callCount <= 1);

		anchorInstance.destroy();
		tagInstance.destroy();
		buttonInstance.destroy();

	});

	it('should trigger secondary click with middle button', function () {

		const anchorSpy = sinon.spy();
		const tagSpy = sinon.spy();
		const buttonSpy = sinon.spy();

		const anchorInstance = fn(anchorTargetElement, {
			onSecondaryAction: anchorSpy
		});
		const tagInstance = fn(tagTargetElement, {
			onSecondaryAction: tagSpy
		});
		const buttonInstance = fn(buttonTargetElement, {
			onSecondaryAction: buttonSpy
		});

		simulant.fire(anchorTargetElement, middleClick);
		simulant.fire(tagTargetElement, middleClick);
		simulant.fire(buttonTargetElement, middleClick);

		assert.ok(anchorSpy.callCount <= 1);
		assert.ok(tagSpy.callCount <= 1);
		assert.ok(buttonSpy.callCount <= 1);

		anchorInstance.destroy();
		tagInstance.destroy();
		buttonInstance.destroy();

	});

	it('should trigger secondary click with meta key + left button', function () {

		const anchorSpy = sinon.spy();
		const tagSpy = sinon.spy();
		const buttonSpy = sinon.spy();

		const anchorInstance = fn(anchorTargetElement, {
			onSecondaryAction: anchorSpy
		});
		const tagInstance = fn(tagTargetElement, {
			onSecondaryAction: tagSpy
		});
		const buttonInstance = fn(buttonTargetElement, {
			onSecondaryAction: buttonSpy
		});

		simulant.fire(anchorTargetElement, metaLeftClick);
		simulant.fire(tagTargetElement, metaLeftClick);
		simulant.fire(buttonTargetElement, metaLeftClick);

		assert.ok(anchorSpy.callCount <= 1);
		assert.ok(tagSpy.callCount <= 1);
		assert.ok(buttonSpy.callCount <= 1);

		anchorInstance.destroy();
		tagInstance.destroy();
		buttonInstance.destroy();

	});

	it('should trigger secondary click with meta key + return key', function () {

		const anchorSpy = sinon.spy();
		const tagSpy = sinon.spy();
		const buttonSpy = sinon.spy();

		const anchorInstance = fn(anchorTargetElement, {
			onSecondaryAction: anchorSpy
		});
		const tagInstance = fn(tagTargetElement, {
			onSecondaryAction: tagSpy
		});
		const buttonInstance = fn(buttonTargetElement, {
			onSecondaryAction: buttonSpy
		});

		simulant.fire(anchorTargetElement, metaReturnKey);
		simulant.fire(tagTargetElement, metaReturnKey);
		simulant.fire(buttonTargetElement, metaReturnKey);

		assert.ok(anchorSpy.callCount <= 1);
		assert.ok(tagSpy.callCount <= 1);
		assert.ok(buttonSpy.callCount <= 1);

		anchorInstance.destroy();
		tagInstance.destroy();
		buttonInstance.destroy();

	});

});

describe('Complex cases', function () {

	it('should ignore primary action of tag faux anchor instance when clicking on children standard anchor', function () {

		const elementOne = document.querySelector('.sammy');
		const standardAnchor = document.querySelector('.piper');

		const spyOne = sinon.spy();

		const instanceOne = fn(elementOne, {
			onPrimaryAction: spyOne
		});

		simulant.fire(elementOne, leftClick);
		simulant.fire(standardAnchor, leftClick);

		assert.ok(spyOne.callCount <= 1);

		instanceOne.destroy();

	});

	it('should trigger primary action of clicked faux anchor instance inside tag faux anchor instance', function () {

		const elementOne = document.querySelector('.sammy');
		const elementTwo = document.querySelector('.piper');
		const elementThree = document.querySelector('.penny');

		const spyOne = sinon.spy();
		const spyTwo = sinon.spy();
		const spyThree = sinon.spy();

		const instanceOne = fn(elementOne, {
			onPrimaryAction: spyOne
		});
		const instanceTwo = fn(elementTwo, {
			onPrimaryAction: spyTwo
		});
		const instanceThree = fn(elementThree, {
			onPrimaryAction: spyThree
		});

		simulant.fire(elementTwo, leftClick);
		simulant.fire(elementThree, leftClick);

		assert.ok(spyOne.callCount <= 0);
		assert.ok(spyTwo.callCount <= 1);
		assert.ok(spyThree.callCount <= 1);

		instanceOne.destroy();
		instanceTwo.destroy();
		instanceThree.destroy();

	});

	it('should ignore primary action on clicked faux anchor instance inside standard anchor', function () {

		const elementOne = document.querySelector('.zoey');
		const elementTwo = document.querySelector('.annie');

		const spyOne = sinon.spy();
		const spyTwo = sinon.spy();

		const instanceOne = fn(elementOne, {
			onPrimaryAction: spyOne
		});
		const instanceTwo = fn(elementTwo, {
			onPrimaryAction: spyTwo
		});

		simulant.fire(elementOne, leftClick);
		simulant.fire(elementTwo, leftClick);

		assert.ok(spyOne.callCount <= 0);
		assert.ok(spyTwo.callCount <= 0);

		instanceOne.destroy();
		instanceTwo.destroy();

	});

	it('should trigger primary action of root anchor faux anchor instance when clicking on faux anchor instance inside anchor faux anchor instance', function () {

		const elementOne = document.querySelector('.scooter');
		const elementTwo = document.querySelector('.zoey');
		const elementThree = document.querySelector('.annie');

		const spyOne = sinon.spy();
		const spyTwo = sinon.spy();
		const spyThree = sinon.spy();

		const instanceOne = fn(elementOne, {
			onPrimaryAction: spyOne
		});
		const instanceTwo = fn(elementTwo, {
			onPrimaryAction: spyTwo
		});
		const instanceThree = fn(elementThree, {
			onPrimaryAction: spyThree
		});

		simulant.fire(elementOne, leftClick);
		simulant.fire(elementTwo, leftClick);
		simulant.fire(elementThree, leftClick);

		assert.ok(spyOne.callCount <= 3);
		assert.ok(spyTwo.callCount <= 0);
		assert.ok(spyThree.callCount <= 0);

		instanceOne.destroy();
		instanceTwo.destroy();
		instanceThree.destroy();

	});

});
