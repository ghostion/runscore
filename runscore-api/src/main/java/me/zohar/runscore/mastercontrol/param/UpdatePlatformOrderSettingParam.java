package me.zohar.runscore.mastercontrol.param;

import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotNull;

import lombok.Data;

@Data
public class UpdatePlatformOrderSettingParam {

	@NotNull
	@DecimalMin(value = "0", inclusive = true)
	private Integer orderReceiveEffectiveDuration;

	@NotNull
	@DecimalMin(value = "0", inclusive = true)
	private Integer orderPayEffectiveDuration;

	@NotNull
	@DecimalMin(value = "0", inclusive = false)
	private Integer receiveOrderUpperLimit;

	@NotNull
	private Boolean unfixedGatheringCodeReceiveOrder;

}
