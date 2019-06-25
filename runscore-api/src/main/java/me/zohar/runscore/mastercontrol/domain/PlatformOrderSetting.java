package me.zohar.runscore.mastercontrol.domain;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import me.zohar.runscore.common.utils.IdUtils;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "platform_order_setting")
@DynamicInsert(true)
@DynamicUpdate(true)
public class PlatformOrderSetting {

	/**
	 * 主键id
	 */
	@Id
	@Column(name = "id", length = 32)
	private String id;

	/**
	 * 接单有效时长
	 */
	private Integer orderReceiveEffectiveDuration;

	/**
	 * 支付有效时长
	 */
	private Integer orderPayEffectiveDuration;

	/**
	 * 接单数量上限
	 */
	private Integer receiveOrderUpperLimit;

	private Boolean unfixedGatheringCodeReceiveOrder;

	/**
	 * 最近修改时间
	 */
	private Date latelyUpdateTime;

	public void update(Integer orderEffectiveDuration, Integer receiveOrderUpperLimit,
			Boolean unfixedGatheringCodeReceiveOrder) {
		this.setOrderReceiveEffectiveDuration(orderEffectiveDuration);
		this.setReceiveOrderUpperLimit(receiveOrderUpperLimit);
		this.setUnfixedGatheringCodeReceiveOrder(unfixedGatheringCodeReceiveOrder);
		this.setLatelyUpdateTime(new Date());
	}

	public static PlatformOrderSetting build() {
		PlatformOrderSetting platformOrderSetting = new PlatformOrderSetting();
		platformOrderSetting.setId(IdUtils.getId());
		return platformOrderSetting;
	}

}
