Array.prototype.extend = function()
{
	var oCurrentObj = {};
	for(var i = 0; i < this.length; i++)
	{
		oCurrentObj = this[i].extend(oCurrentObj);
	}
	return oCurrentObj;
}